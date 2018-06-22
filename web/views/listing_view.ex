defmodule Offerdate.ListingView do
  use Offerdate.Web, :view
  alias Offerdate.Listing

  def render("success.json", %{listing: listing, user: user, property: property, listing_documents: listing_documents}) do
    %{
      status: :ok,
      listing: listing,
      user: user,
      property: property,
      listing_documents: listing_documents,
      message: """
        Listing has been created.
      """
    }
  end

  def render("show.json", %{listing: listing, user: user, 
    property: property, listing_documents: listing_documents, geometry: geometry}) do
    %{
      status: :ok,
      listing: listing,
      user: user,
      property: property,
      listing_documents: listing_documents,
      geometry: geometry,
      message: """
        Showing listing details.
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
