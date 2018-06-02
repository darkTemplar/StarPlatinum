defmodule Offerdate.Listing do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo
  alias Offerdate.Property

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
    has_many(:participants, Offerdate.Participant)

    timestamps()
  end

  @allowed_fields ~w(listing_price sale_price user_id property_id initial_expiry final_expiry beds baths area)

  def changeset(%Listing{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> assoc_constraint(:user)
    |> assoc_constraint(:property)
    |> validate_required([:listing_price, :initial_expiry, :beds, :baths, :area])
  end

  
  def to_multi(params \\ %{}) do
    property_changeset = Property.changeset(%Property{}, params)
    multi = Ecto.Multi.new()
    case Repo.get_by(Property, address_hash: get_field(property_changeset, :address_hash)) do
      nil -> 
        multi
        |> Ecto.Multi.insert(:property, property_changeset)
      {:ok, property} ->
        params = Map.put(params, "property_id", property.id)  
    end

    multi
    |> Ecto.Multi.insert(:listing, Listing.changeset(%Listing{}, params))
  end


  def create_listing(attrs \\ %{}) do
    %Listing{}
    |> changeset(attrs)
    |> Repo.insert()
  end
end
