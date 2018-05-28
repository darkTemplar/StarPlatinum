defmodule Offerdate.SessionController do
  use Offerdate.Web, :controller
  alias Offerdate.Auth

  # action_fallback(Offerdate.Web.FallbackAPIController)

  def new(conn, _) do
    render(conn, "new.html")
  end

  def login(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case Auth.login_by_email(conn, email, password, repo: Repo) do
      {:ok, conn} ->
        conn
        |> put_status(:ok)
        |> render("login.json", user: conn.assigns.current_user)

      {:error, _reason, conn} ->
        conn
        |> put_status(401)
        |> render("error.json", message: "Could not login")
    end
  end

  def delete(conn, _) do
    conn
    |> Offerdate.Auth.logout()
    |> render("delete.json")
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Offerdate.SessionView, "forbidden.json", error: "Not Authenticated")
  end

end
