defmodule Offerdate.ListingController do
  use Offerdate.Web, :controller
  # plug(:authenticate_user when action in [:index, :show])
  alias Offerdate.Auth
  alias Offerdate.Listing

  def show(conn, %{"id" => listing_id}) do
    listing = Repo.get(Listing, String.to_integer(listing_id))
    render(conn, "show.json", user: listing)
  end

  def new(conn, _params) do
    changeset = Listing.changeset(%Listing{})
    render(conn, "new.json", changeset: changeset)
  end

  @apidoc """
  @api {post} /listing/create Create new listing
  @apiName CreateListing
  @apiGroup Listing

  @apiParam {Map} listing listing parameters.
  """
  def create(conn, %{"listing" => listing_params}) do
    changeset = Listing.changeset(%Listing{}, listing_params)

    case Repo.insert(changeset) do
      {:ok, listing} ->
        conn
        |> redirect(to: listing_path(conn, :index))

      {:error, changeset} ->
        render(conn, "error.json", changeset: changeset)
    end
  end

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

  def delete(conn, %{"id" => listing_id}) do
    listing = Repo.get!(Listing, String.to_integer(listing_id))

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(listing)

    send_resp(conn, :no_content, "")
  end
end
