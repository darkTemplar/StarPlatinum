defmodule Offerdate.Listing do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo
  alias Offerdate.Property

  @derive {Poison.Encoder, only: [:listing_price, :sale_price, :initial_expiry, :final_expiry, :beds, :baths, :area, :status]}
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
    field(:status, :integer, default: 1)
    has_many(:participants, Offerdate.Participant)

    timestamps()
  end

  @allowed_fields ~w(listing_price sale_price user_id property_id initial_expiry final_expiry beds baths area status)

  def changeset(%Listing{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:property)
    |> validate_required([:listing_price, :initial_expiry, :final_expiry, :beds, :baths, :area])
  end

  
  def to_multi(params \\ %{}) do
    property_changeset = Property.changeset(%Property{}, params)
    multi = Ecto.Multi.new()
    case Repo.get_by(Property, address_hash: get_field(property_changeset, :address_hash)) do
      nil -> 
        multi
        |> Ecto.Multi.insert(:property, property_changeset)
        |> Ecto.Multi.run(:listing, fn %{property: property} -> 
          params = Map.put(params, "property_id", property.id)
          Repo.insert(Listing.changeset(%Listing{}, params))
        end)
      property ->
        params = Map.put(params, "property_id", property.id)
        multi
        |> Ecto.Multi.insert(:listing, Listing.changeset(%Listing{}, params)) 
    end
  end


  def create_listing(attrs \\ %{}) do
    %Listing{}
    |> changeset(attrs)
    |> Repo.insert()
  end
end
