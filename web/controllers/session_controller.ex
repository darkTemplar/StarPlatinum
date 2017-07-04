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
				user = conn.assigns.current_user
				conn
				|> put_flash(:info, "Welcome Back #{user.first_name}!")
				|> redirect(to: page_path(conn, :index))
			{:error, _reason, conn} ->
				conn
				|> put_flash(:error, "Wrong email or password. Please try again.")
				|> render("new.html") 
		end
	end

	def delete(conn, _) do
		conn
		|> Auth.logout
		|> redirect(to: page_path(conn, :index))
	end
end