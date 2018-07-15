defmodule Offerdate.Role do
  use Offerdate.Web, :model
  alias __MODULE__
  alias Offerdate.Repo

  schema "roles" do
    field(:name, :string)
    timestamps()
  end

  @allowed_fields ~w(name)

  def changeset(%Role{} = model, params \\ :invalid) do
    model
    |> cast(params, @allowed_fields)
    |> validate_required([:name])
  end

  def create_role(attrs \\ %{}) do
    %Role{}
    |> changeset(attrs)
    |> Repo.insert!()
  end

  def buyer, do: "Buyer"

  def buyer_agent, do: "Buyer Agent"

  def listing_agent, do: "Listing Agent" 
end