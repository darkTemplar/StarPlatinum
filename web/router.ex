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

  pipeline :authenticated do
    plug(Guardian.Plug.EnsureAuthenticated)
  end

  scope "/api", Offerdate do
    pipe_through(:api)

    post("/signup", UserController, :signup)
    post("/login", SessionController, :login)

    # restrict unauthenticated access for routes below
    pipe_through(:authenticated)
    resources("/users", UserController, only: [:index, :show])
    resources("/listings", ListingController, only: [:new, :show, :edit, :delete])
    post("/getSignature", S3Controller, :create)
  end

  scope "/", Offerdate do
    pipe_through(:browser)
    get("/", PageController, :index)
    # resources("/users", UserController, only: [:index, :show, :new, :create])
    # resources("/sessions", SessionController, only: [:new, :create, :delete])
  end
end
