defmodule Offerdate.ListingController do
  use Offerdate.Web, :controller
  plug :check_listing_user when action in [:show, :edit, :update, :delete]
  alias Offerdate.Auth
  alias Offerdate.Listing
  alias Offerdate.GoogleController
  alias Offerdate.S3
  alias Offerdate.TimeUtils

  def index(conn, _params) do
    current_user_id = get_session(conn, :user_id)
    listings = 
      from(l in Listing, where: l.user_id == ^(current_user_id))
      |> Repo.all()
      |> Repo.preload([:property, :listing_documents])
      properties = listings |> Enum.map(fn x -> x.property end)
      listing_documents = listings
        |> Enum.map(fn x -> x.listing_documents end) 
        |> Enum.map(fn x -> Enum.map(x, fn y -> [y.url, y.type] end) end)
      render(conn, "index.json", %{listings: listings, properties: properties, listing_documents: listing_documents})
  end

  @apidoc """
  @api {get} /listing/:id Show existing listing
  @apiName ShowListing
  @apiGroup Listing

  @apiParam {Int} listing id.
  """
  def show(conn, %{"id" => listing_id}) do
    prefs = [Listing.price(), Listing.escrow_period(), Listing.escrow_title_fee(), 
      Listing.contingencies(), Listing.financing(), Listing.property_condition(),
      Listing.offer_expiration(), Listing.disclosures()]
    listing = conn.assigns.listing
    # return list of tuples of listing doc urls and type
    listing_documents = listing.listing_documents
      |> Enum.map(fn x -> [x.url, x.type] end)
    render(conn, "show.json", listing: listing, user: listing.user, 
      property: listing.property, listing_documents: listing_documents, 
      geometry: get_in(conn.assigns, [:address, :geometry]),
      formatted_address: get_in(conn.assigns, [:address, :formatted_address]),
      agent_preferences: prefs)
  end

  @apidoc """
  @api {get} /listing/:id/edit Edit existing listing
  @apiName EditListing
  @apiGroup Listing

  @apiParam {Int} listing id.
  """
  def edit(conn, %{"id" => listing_id}) do
    listing = conn.assigns.listing
    # return list of tuples of listing doc urls and type
    listing_documents = listing.listing_documents
      |> Enum.map(fn x -> [x.url, x.type] end)
    prefs = [Listing.price(), Listing.escrow_period(), Listing.escrow_title_fee(), 
      Listing.contingencies(), Listing.financing(), Listing.property_condition(),
      Listing.offer_expiration(), Listing.disclosures()]  
    render(conn, "show.json", listing: listing, user: listing.user, 
      property: listing.property, listing_documents: listing_documents,
      geometry: get_in(conn.assigns, [:address, :geometry]),
      formatted_address: get_in(conn.assigns, [:address, :formatted_address]),
      agent_preferences: prefs)
  end

  def new(conn, _params) do
    prefs = [Listing.price(), Listing.escrow_period(), Listing.escrow_title_fee(), 
      Listing.contingencies(), Listing.financing(), Listing.property_condition(),
      Listing.offer_expiration(), Listing.disclosures()]
    render(conn, "new.json", agent_preferences: prefs)
  end

  @apidoc """
  @api {post} /listing Create new listing
  @apiName CreateListing
  @apiGroup Listing

  @apiParam {Map} listing listing parameters.
  """
  def create(conn, %{"listing" => listing_params}) do
    # add current session user_id to params
    user_id = get_session(conn, :user_id)
    listing_params = Map.put(listing_params, "user_id", user_id)
    # add in structured address params + formatted address from google place details api
    address_params = GoogleController.get_place_details(listing_params["place_id"])
    # convert supplied unix time stamps to naive datetime structs
    time_params = %{
      "initial_expiry" => TimeUtils.unix_to_naive_datetime(listing_params["initial_expiry"]),
      "final_expiry" => TimeUtils.unix_to_naive_datetime(listing_params["final_expiry"]),
    }

    listing_params = listing_params 
      |> Map.merge(time_params)
      |> Map.merge(address_params)

    multi = Listing.to_multi(listing_params)
      
    case Repo.transaction(multi) do
      {:ok, %{listing: listing}} ->
        # load created listing along with associations
        created_listing = Repo.get_by(Listing, id: listing.id) 
          |> Repo.preload([:property, :user, :listing_documents])
        # return list of tuples of listing doc urls and type
        listing_documents = created_listing.listing_documents
          |> Enum.map(fn x -> [x.url, x.type] end)
        conn
        |> put_status(:created)
        # here call an insert function to property images table (and use task.await from s3 image upload there)
        |> render("success.json", listing: created_listing, user: created_listing.user,
         property: created_listing.property, listing_documents: listing_documents)
      {:error, _operation, repo_changeset, _changes} ->
        conn
        |> put_status(:unprocessable_entity)
        #changeset = copy_errors(repo_changeset, Listing.changeset)
        |> render(Offerdate.ChangesetView, "error.json", changeset: repo_changeset)
    end
  end

  @apidoc """
  @api {put} /listing/:id Update existing listing
  @apiName UpdateListing
  @apiGroup Listing

  @apiParam {Int} listing id to be updated.
  @apiParam {Map} listing listing parameters.
  """
  def update(conn, %{"id" => listing_id, "listing" => listing_params}) do
    prefs = [Listing.price(), Listing.escrow_period(), Listing.escrow_title_fee(), 
      Listing.contingencies(), Listing.financing(), Listing.property_condition(),
      Listing.offer_expiration(), Listing.disclosures()]
    listing = conn.assigns.listing
    changeset = Listing.changeset(listing, listing_params)

    case Repo.update(changeset) do
      {:ok, listing} ->
        listing_documents = listing.listing_documents
          |> Enum.map(fn x -> [x.url, x.type] end)
        render(conn, "show.json", listing: listing, user: listing.user, 
          property: listing.property, listing_documents: listing_documents, 
          geometry: get_in(conn.assigns, [:address, :geometry]),
          formatted_address: get_in(conn.assigns, [:address, :formatted_address]),
          agent_preferences: prefs)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(conn, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {delete} /listing/:id Update existing listing
  @apiName DeleteListing
  @apiGroup Listing

  @apiParam {Int} listing id to be deleted.
  """
  def delete(conn, %{"id" => listing_id}) do
    listing = Repo.get!(Listing, String.to_integer(listing_id))

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(listing)

    send_resp(conn, :no_content, "")
  end
end
