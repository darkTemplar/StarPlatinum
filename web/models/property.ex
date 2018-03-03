defmodule Offerdate.Property do
  use Offerdate.Web, :model
  alias __MODULE__

  schema "properties" do
    field(:street_address, :string)
    field(:unit_number, :string)
    field(:city, :string)
    field(:state, :string)
    field(:country, :string)
    field(:zip, :string)
    field(:lat, :string)
    field(:long, :string)
    field(:address_hash, :string)
    has_many(:property_images, Offerdate.PropertyImage)
    has_many(:listings, Offerdate.Listing)

    timestamps
  end

  @allowed_fields ~w(street_address unit_number city state country zip)

  def changeset(%Property{} = model, params \\ :invalid) do
    # |> put_lat_long()
    model
    |> cast(params, @allowed_fields)
    |> validate_required([:street_address, :country, :zip])
    |> put_address_hash()
    |> unique_constraint(:address_hash)
  end

  defp put_address_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: changes} ->
        put_change(
          changeset,
          :address_hash,
          :crypto.hash(:sha256, Map.values(changes)) |> Base.encode16()
        )

      _ ->
        changeset
    end
  end

  def create_property(attrs \\ %{}) do
    %Property{}
    |> changeset(attrs)
    |> Repo.insert!()
  end
end
