defmodule Offerdate.UserController do
  use Offerdate.Web, :controller
  plug :authenticate_user when action in [:index, :show]
  alias Offerdate.User
  alias Offerdate.Auth


  def index(conn, _params) do
  	users = Repo.all(User)
    render conn, "index.html", users: users
  end

  def show(conn, %{"id" => user_id}) do
  	user = Repo.get(User, String.to_integer(user_id))
  	render conn, "show.html", user: user
  end

  def new(conn, _params) do
  	changeset = User.changeset(%User{})
  	render conn, "new.html", changeset: changeset
  end

  def create(conn, %{"user" => user_params}) do
  	changeset = User.changeset(%User{}, user_params)
  	case Repo.insert(changeset) do
  		{:ok, user} -> 
  			conn
  			|> Auth.login(user)
  			|> put_flash(:info, "#{user.first_name <> " " <> user.last_name} created!")
  			|> redirect(to: user_path(conn, :index))
  		{:error, changeset} -> 
  			render conn, "new.html", changeset: changeset
  	end
  end

end