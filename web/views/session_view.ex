defmodule Offerdate.SessionView do
  use Offerdate.Web, :view
  alias Offerdate.User

  def render("login.json", %{user: user, jwt: jwt}) do
    %{
      status: :ok,
      data: %{
        token: jwt,
        email: user.email
      },
      message:
        "You are successfully logged in! Add this token to authorization header to make authorized requests."
    }
  end
end
