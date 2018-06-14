defmodule Offerdate.ListingDocument do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo

  schema "listing_documents" do
    belongs_to(:listing, Offerdate.Listing)
    field(:type, :integer)
    field(:url, :string)
    field(:etag, :string)
    field(:size, :float)

    timestamps()
  end

  @allowed_fields ~w(listing_id type url etag size)

  def changeset(%ListingDocument{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> assoc_constraint(:listing)
    |> validate_required([:type, :url])
  end

  def create_listing_document(attrs \\ %{}) do
    %ListingDocument{}
    |> changeset(attrs)
    |> Repo.insert()
  end
end
