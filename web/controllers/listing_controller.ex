defmodule Offerdate.ListingController do
  use Offerdate.Web, :controller
  # plug(:authenticate_user when action in [:index, :show])
  alias Offerdate.Auth
  alias Offerdate.Listing
  alias Offerdate.S3

  def show(conn, %{"id" => listing_id}) do
    listing = Repo.get(Listing, String.to_integer(listing_id))
    render(conn, "show.json", listing: listing)
  end

  def new(conn, _params) do
    render(conn, "new.json", agent_preferences: Listing.get_preferences())
  end

  @apidoc """
  @api {post} /listing/create Create new listing
  @apiName CreateListing
  @apiGroup Listing

  @apiParam {Map} listing listing parameters.
  """
  def create(conn, %{"listing" => listing_params}) do
    # add current session user_id to params
    user_id = get_session(conn, :user_id)
    listing_params = Map.put(listing_params, "user_id", user_id)
    multi = Listing.to_multi(listing_params)
      
    case Repo.transaction(multi) do
      {:ok, %{listing: listing}} ->
        conn
        |> put_status(:created)
        # here call an insert function to property images table (and use task.await from s3 image upload there)
        |> render("success.json", listing: listing)
      {:error, _operation, repo_changeset, _changes} ->
        conn
        |> put_status(:unprocessable_entity)
        #changeset = copy_errors(repo_changeset, Listing.changeset)
        |> render(Offerdate.ChangesetView, "error.json", changeset: repo_changeset)
    end
  end

  @apidoc """
  @api {post} /listing/update Update existing listing
  @apiName UpdateListing
  @apiGroup Listing

  @apiParam {Int} listing id to be updated.
  @apiParam {Map} listing listing parameters.
  """
  def update(conn, %{"id" => listing_id, "listing" => listing_params}) do
    listing = Repo.get(Listing, String.to_integer(listing_id))
    changeset = Listing.changeset(listing, listing_params)

    case Repo.update(changeset) do
      {:ok, listing} ->
        render(conn, "show.json", listing: listing)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(conn, "error.json", changeset: changeset)
    end
  end

  @apidoc """
  @api {post} /listing/delete Update existing listing
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
