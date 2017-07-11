defmodule Offerdate.Repo.Migrations.CreateProperty do
  use Ecto.Migration

  def change do
	create table(:properties) do
	  	add :street_address, :string, null: false
		add :unit_number, :string
		add :city, :string
		add :state, :string
		add :country, :string
		add :zip, :string
		add :lat, :string
		add :long, :string
		add :address_hash, :integer, null: false

		timestamps()
  	end
  	create unique_index(:properties, [:address_hash])

  	create table(:property_images) do
	  	add :url, :string, null: false
		add :property_id, references(:properties, on_delete: :nothing)
		add :etag, :string
		add :size, :float

		timestamps()
  	end
  	create unique_index(:property_images, [:property_id])
  end
end
