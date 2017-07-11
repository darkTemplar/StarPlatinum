defmodule Offerdate.Repo.Migrations.CreateMls do
  use Ecto.Migration

  def change do
	create table(:mls) do
	  	add :mls, :string, null: false
		add :listing_id, references(:listings, on_delete: :nothing)

		timestamps()
  	end
  	create unique_index(:mls, [:mls, :listing_id], name: :listing_mls_index)
  end
end
