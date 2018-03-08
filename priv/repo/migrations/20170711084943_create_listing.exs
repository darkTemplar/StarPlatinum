defmodule Offerdate.Repo.Migrations.CreateListing do
  use Ecto.Migration

  def change do
    create table(:listings) do
      add(:listing_price, :float, null: false)
      add(:sale_price, :float)
      add(:user_id, references(:users, on_delete: :nothing), null: false)
      add(:property_id, references(:properties, on_delete: :nothing), null: false)
      add(:initial_expiry, :date, null: false)
      add(:final_expiry, :date, null: false)
      add(:beds, :integer)
      add(:baths, :integer)
      add(:area, :float)
      timestamps()
    end

    create(index(:listings, [:user_id]))
    create(index(:listings, [:property_id]))
  end
end
