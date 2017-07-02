defmodule Offerdate.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
  	create table(:users) do
  		add :email, :string, null: false
		add :password_hash, :string, null: false
		add :first_name, :string
		add :last_name, :string
		add :license_number, :string
		add :phone, :string
		add :user_type, :integer, default: 0

		timestamps
  	end

  	create unique_index(:users, [:email])
  end
end
