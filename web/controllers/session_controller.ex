defmodule Offerdate.SessionController do
	use Offerdate.Web, :controller
	alias Offerdate.Auth

	def new(conn, _) do
		render conn, "new.html"
	end

	def create(conn, 
		%{"session" => %{"email" => email, "password" => password}}) do
		case Auth.login_by_email(conn, email, password, repo: Repo) do
			{:ok, conn} ->
				new_conn = Guardian.Plug.api_sign_in(conn, conn.assigns[:current_user])
            	jwt = Guardian.Plug.current_token(new_conn)
            	{:ok, claims} = Guardian.Plug.claims(new_conn)
            	exp = Map.get(claims, "exp")

            	new_conn
            	|> put_resp_header("authorization", "Bearer #{jwt}")
            	|> put_resp_header("x-expires", "#{exp}")
            	|> render("login.json", jwt: jwt)
			{:error, _reason, conn} ->
				conn
				|> put_status(500)
            	|> render("error")
		end
	end

	def delete(conn, _) do
		conn
		|> Auth.logout
		|> redirect(to: page_path(conn, :index))
	end
end