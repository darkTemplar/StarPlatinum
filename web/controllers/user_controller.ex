defmodule Offerdate.UserController do
  use Offerdate.Web, :controller

  def index(conn, _params) do
  	users = Repo.all(Offerdate.User)
    render conn, "index.html", users: users
  end

  def show(conn, %{"id" => user_id}) do
  	user = Repo.get(Offerdate.User, String.to_integer(user_id))
  	render conn, "show.html", user: user
  end

  def new(conn, _params) do
  	changeset = User.changeset(%User{})
  	render conn, "new.html", changeset: changeset

  end

end