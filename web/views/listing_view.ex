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

  def render("show.json", %{listing: listing}) do
    %{
      status: :ok,
      listing: listing,
      message: """
        Listing has been updated.
      """
    }
  end

  def render("new.json", %{agent_preferences: agent_preferences}) do
    %{
      status: :ok,
      agent_preferences: agent_preferences,
      message: """
        New listing initial params.
      """
    }
  end

end
