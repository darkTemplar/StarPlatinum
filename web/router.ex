defmodule Offerdate.Router do
  use Offerdate.Web, :router
  import Offerdate.Auth, only: [authenticate_user: 2]

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Offerdate.Auth, repo: Offerdate.Repo
  end

  pipeline :api do
    plug :fetch_session
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug Offerdate.Auth, repo: Offerdate.Repo
  end

  scope "/api", Offerdate do
    pipe_through :api

    post "/signup", UserController, :signup
    post "/login", SessionController, :login

    # restrict unauthenticated access for routes below
    pipe_through :authenticated
    resources "/users", UserController, only: [:index, :show]
    resources "/listings", ListingController, only: [:new, :show, :edit, :delete]
    post "/getSignature", S3Controller, :create
    delete "/logout", SessionController, :delete
  end

  scope "/", Offerdate do
    pipe_through :browser
    get "/", PageController, :index
    # resources("/users", UserController, only: [:index, :show, :new, :create])
    # resources("/sessions", SessionController, only: [:new, :create, :delete])
  end
end
