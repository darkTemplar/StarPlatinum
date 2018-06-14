defmodule Offerdate.Repo.Migrations.CreateProperty do
  use Ecto.Migration

  def change do
    create table(:properties) do
      add(:street_address, :string, null: false)
      add(:unit_number, :string)
      add(:city, :string)
      add(:state, :string)
      add(:country, :string)
      add(:zip, :string)
      add(:place_id, :string)
      add(:address_hash, :string, null: false)

      timestamps()
    end

    create(unique_index(:properties, [:place_id]))
  end
end
