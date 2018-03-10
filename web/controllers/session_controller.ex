defmodule Offerdate.SessionController do
  use Offerdate.Web, :controller
  alias Offerdate.Auth

  def new(conn, _) do
    render(conn, "new.html")
  end

  def login(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case Auth.login_by_email(conn, email, password, repo: Repo) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :api)

        # |> put_resp_header("x-expires", "#{exp}")
        conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", user: user, jwt: jwt)

      {:error, _reason} ->
        conn
        |> put_status(401)
        |> render("error.json", message: "Could not login")
    end
  end

  def delete(conn, _) do
    conn
    |> Auth.logout()
    |> redirect(to: page_path(conn, :index))
  end
end
