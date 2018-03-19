defmodule Offerdate.ListingView do
  use Offerdate.Web, :view
  alias Offerdate.Listing

  def render("success.json", %{listing: listing}) do
    %{
      status: :ok,
      listing: listing,
      message: """
        Listing has been created.
      """
    }
  end
end
