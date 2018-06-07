defmodule Offerdate.GoogleView do
  use Offerdate.Web, :view
  alias Offerdate.User


  def render("success.json", %{suggestions: suggestions}) do
    %{
      status: :ok,
      message: """
        Results from Google places API
      """,
      suggestions: suggestions
    }
  end

  def render("error.json", %{message: message}) do
    %{
      status: :ok,
      message: message
    }
  end

end