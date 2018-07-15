defmodule Offerdate.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do

  	create table(:roles) do
		add :name, :string
		timestamps()
  	end
  	create unique_index(:roles, [:name])


  	create table(:users) do
  		add :email, :string, null: false
		add :password_hash, :string, null: false
		add :first_name, :string
		add :last_name, :string
		add :license_number, :string
		add :phone, :string
		add :status, :integer, default: 0
		add :role_id, references(:roles, on_delete: :nothing)

		timestamps
  	end

  	create unique_index(:users, [:email])
  end
end
