defmodule Offerdate.Repo.Migrations.CreateListing do
  use Ecto.Migration

  def change do
	create table(:listings) do
	  	add :listing_price, :float, null: false
		add :sale_price, :float
		add :user_id, references(:users, on_delete: :nothing)
		add :property_id, references(:properties, on_delete: :nothing)
		add :initial_expiry, :date, null: false
		add :final_expiry, :date, null: false
		add :beds, :integer
		add :bath, :integer
		add :area, :float
		timestamps()
  	end
  	create unique_index(:listings, [:user_id])
  	create unique_index(:listings, [:property_id])

  end
end
