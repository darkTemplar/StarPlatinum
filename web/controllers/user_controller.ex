defmodule Offerdate.UserController do
  use Offerdate.Web, :controller
  alias Offerdate.User

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def show(conn, %{"id" => user_id}) do
    user = Repo.get(User, String.to_integer(user_id))
    render(conn, "show.json", user: user)
  end

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    render(conn, "new.json", changeset: changeset)
  end

  def signup(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_path(conn, :show, user))
        |> render("success.json" user: user)

      {:error, changeset} ->
        |> put_status(:unprocessable_entity)
        |> render(Offerdate.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => user_id, "user" => user_params}) do
    user = Repo.get(User, String.to_integer(user_id))
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "show.json", user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(JwtExample.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => user_id}) do
    user = Repo.get!(User, String.to_integer(user_id))

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    send_resp(conn, :no_content, "")
  end
end
