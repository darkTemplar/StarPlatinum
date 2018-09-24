defmodule Offerdate.Repo.Migrations.AddFormattedAddress do
  use Ecto.Migration

  def change do
  	alter table(:properties) do
  		add :formatted_address, :string
  	end
  end
end
