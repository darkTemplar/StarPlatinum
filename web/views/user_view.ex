defmodule Offerdate.UserView do
  use Offerdate.Web, :view
  alias Offerdate.User

  def full_name(%User{first_name: first_name, last_name: last_name}) do
    first_name <> " " <> last_name
  end

  def render("success.json", %{user: user}) do
    %{
      status: :ok,
      message: """
        Now you can sign in using your email and password at /api/login. You will receive JWT token.
        Please put this token into Authorization header for all authorized requests.
      """
    }
  end

  def render("current_user.json", %{user: user}) do
    %{
      status: :ok,
      user: user
    }
  end

end
