defmodule Offerdate.Property do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo

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
    has_many(:property_images, Offerdate.PropertyImage, on_delete: :delete_all)
    has_many(:listings, Offerdate.Listing, on_delete: :delete_all)

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

  def create_hash(address \\ %{}) do
    :crypto.hash(:sha256, Map.values(address)) |> Base.encode16()
  end

  defp put_address_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: changes} ->
        put_change(
          changeset,
          :address_hash,
          create_hash(changes)
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
