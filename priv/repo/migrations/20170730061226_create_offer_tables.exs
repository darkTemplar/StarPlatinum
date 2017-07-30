defmodule Offerdate.Repo.Migrations.CreateOfferTables do
  use Ecto.Migration

  def change do

  	create table(:participants) do
		add :listing_id, references(:listings, on_delete: :nothing)
		add :type, :integer		
		add :bid, :map
		timestamps()
  	end
  	create unique_index(:participants, [:listing_id, :type])


	create table(:documents) do
		add :user_id, references(:users, on_delete: :nothing)
		add :listing_id, references(:listings, on_delete: :nothing)
		add :type, :integer		
		add :url, :string
		add :description, :string
		add :etag, :string
		add :size, :float
		timestamps()
  	end
  	create unique_index(:documents, [:user_id, :listing_id])

  end
end
