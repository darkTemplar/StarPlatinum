defmodule Offerdate.Router do
  use Offerdate.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Offerdate.Auth, repo: Offerdate.Repo
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end


  scope "/api", JwtExample do
    pipe_through [ :api, :api_auth ]
    resources "/users", UserApiController, only: [:index, :show, :new, :create]
    resources "/listings", ListingController, only: [:new, :show, :edit, :delete]
  end

  scope "/", Offerdate do
    pipe_through :browser
    get "/index.html", PageController, :index
    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", Offerdate do
  #   pipe_through :api
  # end
end
