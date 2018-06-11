defmodule Offerdate.SessionView do
  use Offerdate.Web, :view
  alias Offerdate.User

  def render("login.json", %{user: user}) do
    %{
      status: :ok,
      user: user,
      message:
        "You are successfully logged in! Add this token to authorization header to make authorized requests."
    }
  end

  def render("error.json", _) do
    %{errors: "Invalid email or password"}
  end

  def render("delete.json", _) do
    %{ok: true}
  end

  def render("forbidden.json", %{error: error}) do
    %{error: error}
  end
  
end
