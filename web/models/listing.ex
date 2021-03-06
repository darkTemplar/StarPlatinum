defmodule Offerdate.Listing do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo
  alias Offerdate.Property
  alias Offerdate.ListingDocument

  @price ["Price", 1]
  @escrow_period ["Escrow Period", 2]
  @escrow_title_fee ["Escrow Title Fee", 3]
  @contingencies ["Contingencies", 4]
  @financing ["Financing", 5]
  @property_condition ["Property Condition", 6]
  @offer_expiration ["Offer Expiration", 7]
  @disclosures ["Disclosures", 8]

  @derive {Poison.Encoder, only: [:id, :listing_price, :sale_price, :initial_expiry, :final_expiry, :beds, :baths, :area, :lot_size, :status, :preferences]}
  schema "listings" do
    field(:listing_price, :float)
    field(:sale_price, :float)
    belongs_to(:user, Offerdate.User)
    belongs_to(:property, Offerdate.Property)
    field(:initial_expiry, :naive_datetime)
    field(:final_expiry, :naive_datetime)
    field(:beds, :integer)
    field(:baths, :integer)
    field(:area, :float)
    field(:lot_size, :float)
    field(:status, :integer, default: 1)
    field :preferences, :map
    has_many(:listing_documents, ListingDocument)
    has_many(:participants, Offerdate.Participant)

    timestamps()
  end

  @allowed_fields ~w(listing_price sale_price user_id property_id initial_expiry final_expiry beds baths area lot_size status preferences)

  def changeset(%Listing{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:property)
    |> validate_required([:listing_price, :initial_expiry, :final_expiry, :beds, :baths, :area])
  end

  
  def to_multi(params \\ %{}) do
    # async task to upload docs like images and disclosures to s3
    listing_doc_params = Task.async(fn -> Offerdate.S3.upload_files(params["files"]) end)
    property_changeset = Property.changeset(%Property{}, params)
    multi = Ecto.Multi.new()
    # check to see if property already exists or if we need to create a new entry
    case Repo.get_by(Property, place_id: get_field(property_changeset, :place_id)) do
      nil -> 
        multi
        |> Ecto.Multi.insert(:property, property_changeset)
        |> Ecto.Multi.run(:listing, fn %{property: property} -> 
          params = Map.put(params, "property_id", property.id)
          Repo.insert(Listing.changeset(%Listing{}, params))
        end)
        |> Ecto.Multi.run(:listing_document, fn multi ->
          ListingDocument.insert_from_s3(Task.await(listing_doc_params), multi.listing.id)
        end)
      property ->
        params = Map.put(params, "property_id", property.id)
        multi
        |> Ecto.Multi.insert(:listing, Listing.changeset(%Listing{}, params))
        |> Ecto.Multi.run(:listing_document, fn multi -> 
          ListingDocument.insert_from_s3(Task.await(listing_doc_params), multi.listing.id)
        end)
    end
  end

  def create_listing(attrs \\ %{}) do
    %Listing{}
    |> changeset(attrs)
    |> Repo.insert()
  end

  def price(), do: @price

  def escrow_period(), do: @escrow_period

  def escrow_title_fee(), do: @escrow_title_fee

  def contingencies(), do: @contingencies

  def financing(), do: @financing

  def property_condition(), do: @property_condition

  def offer_expiration(), do: @offer_expiration

  def disclosures(), do: @disclosures
end
