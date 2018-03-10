defmodule Offerdate.Router do
  use Offerdate.Web, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(Offerdate.Auth, repo: Offerdate.Repo)
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(Guardian.Plug.VerifyHeader)
    plug(Guardian.Plug.LoadResource)
  end

  pipeline :api_auth do
    plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
    plug(Guardian.Plug.LoadResource)
  end

  scope "/api", Offerdate do
    pipe_through(:api)

    post("/signup", UserController, :signup)
    post("/login", SessionController, :login)

    # restrict unauthenticated access for routes below
    pipe_through(:authenticated)
    resources("/users", UserController, only: [:index, :show])
    resources("/listings", ListingController, only: [:new, :show, :edit, :delete])
  end

  scope "/", Offerdate do
    pipe_through(:browser)
    get("/", PageController, :index)
    resources("/users", UserController, only: [:index, :show, :new, :create])
    resources("/sessions", SessionController, only: [:new, :create, :delete])
  end
end
