defmodule Offerdate.Repo.Migrations.CreateMls do
  use Ecto.Migration

  def change do
	create table(:mls) do
	  	add :mls, :string, null: false
		add :listing_id, references(:listings, on_delete: :nothing)

		timestamps()
  	end
  	create unique_index(:mls, [:mls])
  	create unique_index(:mls, [:listing_id])
  end
end
