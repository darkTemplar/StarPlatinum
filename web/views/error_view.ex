defmodule Offerdate.Web.ErrorView do
  use Offerdate.Web, :view

  # ...
  def render("error.json", %{status: status, message: message}) do
    %{status: status, message: message}
  end

  # ...
end
