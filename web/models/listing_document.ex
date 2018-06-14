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
  
  def insert_from_s3(s3_params, listing_id) do
    extra_params = %{:listing_id => listing_id, :inserted_at => NaiveDateTime.utc_now(), :updated_at => NaiveDateTime.utc_now()}
    insert_params = s3_params |> 
        Enum.map(fn params -> Map.merge(params, extra_params) end)
    case Repo.insert_all(ListingDocument, insert_params) do
      {0, _} -> 
        {:error, "Insert all failed"}
      {_, val} -> 
        {:ok, val}
    end
  end


end
