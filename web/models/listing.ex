defmodule Offerdate.Listing do
  use Offerdate.Web, :model
  alias __MODULE__

  schema "listings" do
    field(:listing_price, :float)
    field(:sale_price, :float)
    belongs_to(:user, Offerdate.User)
    belongs_to(:property, Offerdate.Property)
    field(:initial_expiry, :date)
    field(:final_expiry, :date)
    field(:beds, :integer)
    field(:baths, :integer)
    field(:area, :float)
    has_many(:participants, Offerdate.Participant)

    timestamps()
  end

  @allowed_fields ~w(listing_price sale_price initial_expiry final_expiry beds bath area)

  def changeset(%Listing{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> cast_assoc(:user, required: true)
    |> cast_assoc(:property, required: true)
    |> validate_required([:listing_price, :initial_expiry, :bed, :bath, :area])
  end

  def create_listing(attrs \\ %{}) do
    %Listing{}
    |> changeset(attrs)
    |> Repo.insert!()
  end
end
