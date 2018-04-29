defmodule Offerdate.SessionController do
  use Offerdate.Web, :controller
  alias Offerdate.Auth

  # action_fallback(Offerdate.Web.FallbackAPIController)

  def new(conn, _) do
    render(conn, "new.html")
  end

  def login(conn, %{"session" => %{"email" => email, "password" => password}}) do
    case Auth.login_by_email(conn, email, password, repo: Repo) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :api)

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
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end

  def refresh(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    jwt = Guardian.Plug.current_token(conn)
    {:ok, claims} = Guardian.Plug.claims(conn)

    case Guardian.refresh!(jwt, claims, %{ttl: {30, :days}}) do
      {:ok, new_jwt, _new_claims} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Offerdate.SessionView, "forbidden.json", error: "Not Authenticated")
  end

end
