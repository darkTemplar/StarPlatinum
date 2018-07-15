defmodule Offerdate.Repo.Migrations.CreateOfferTables do
  use Ecto.Migration

  def change do

  	create table(:bids) do
		add :listing_id, references(:listings, on_delete: :nothing)
		add :user_id, references(:users, on_delete: :nothing)
		add :offer, :map
		add :history, :map
		timestamps()
  	end
  	create unique_index(:bids, [:listing_id])


	create table(:participants) do
		add :user_id, references(:users, on_delete: :nothing)
		add :participant_id, references(:users, on_delete: :nothing)
		add :listing_id, references(:listings, on_delete: :nothing)
		timestamps()
  	end
  	create unique_index(:participants, [:user_id, :listing_id])
  	create unique_index(:participants, [:user_id, :participant_id])

  end
end
