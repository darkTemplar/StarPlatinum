defmodule Offerdate.Repo.Migrations.AddListingPrefs do
  use Ecto.Migration

  def change do
	alter table(:listings) do
		add :lot_size, :float
		add :preferences, :map
  	end
  end
end
