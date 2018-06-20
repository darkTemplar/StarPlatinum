defmodule Offerdate.Property do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo

  @derive {Poison.Encoder, only: [:id, :street_number, :route, :unit_number, :city, :state, :country, :postal_code, :place_id]}
  schema "properties" do
    field(:street_number, :string)
    field(:route, :string)
    field(:unit_number, :string)
    field(:city, :string)
    field(:state, :string)
    field(:country, :string)
    field(:postal_code, :string)
    field(:place_id, :string)
    field(:address_hash, :string)
    has_many(:listings, Offerdate.Listing, on_delete: :delete_all)

    timestamps
  end

  @allowed_fields ~w(street_number route unit_number city state country postal_code place_id)

  def changeset(%Property{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> validate_required([:street_number, :route, :country])
    |> put_address_hash()
    |> unique_constraint(:place_id)
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
