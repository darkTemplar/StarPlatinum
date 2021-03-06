defmodule Offerdate.Auth do
  import Plug.Conn
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  import Phoenix.Controller
  alias Offerdate.GoogleController
  alias Offerdate.User
  alias Offerdate.Repo
  alias Offerdate.Listing
  alias Offerdate.Router.Helpers

  def init(opts) do
    Keyword.fetch!(opts, :repo)
  end

  def call(conn, repo) do
    user_id = get_session(conn, :user_id)
    user = user_id && repo.get(User, user_id)
    assign(conn, :current_user, user)
  end

  def authenticate_user(conn, _opts) do
    if conn.assigns.current_user do
      conn
    else
      conn
      |> put_status(401)
      |> render(Offerdate.ErrorView, :"401", message: "You are not authorized to view this page")
      |> halt()
    end
  end

  def check_listing_user(conn, _opts) do
    listing_id = conn.params["id"]
    listing = Repo.get(Listing, String.to_integer(listing_id)) |> Repo.preload([:property, :user, :listing_documents])
    current_user = conn.assigns.current_user
    case listing do
      listing ->
        if current_user && current_user.id == listing.user.id do
          conn
          |> assign(:listing, listing)
          |> assign(:address, GoogleController.get_address(listing.property.place_id))
        else
          conn
          |> put_status(401)
          |> render(Offerdate.ErrorView, :"401", message: "You are not authorized to view this page")
          |> halt()
        end
      nil ->
        conn
        |> put_status(404)
        |> render(Offerdate.ErrorView, :"404", message: "Requested listing was not found")
    end
    
  end

  def get_current_user(conn) do
    conn.assigns[:current_user]
  end

  def login(conn, user) do
    conn
    |> assign(:current_user, user)
    |> put_session(:user_id, user.id)
    |> configure_session(renew: true)
  end

  def login_by_email(conn, email, password, opts) do
    repo = Keyword.fetch!(opts, :repo)
    user = repo.get_by(User, email: email)

    cond do
      user && checkpw(password, user.password_hash) ->
        {:ok, login(conn, user)}

      user ->
        {:error, :unauthorized, conn}

      true ->
        dummy_checkpw()
        {:error, :not_found, conn}
    end
  end

  def logout(conn) do
    configure_session(conn, drop: true)
  end
end
