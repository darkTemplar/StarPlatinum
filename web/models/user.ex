defmodule Offerdate.User do
	use Offerdate.Web, :model

	schema "users" do
		field :email, :string
		field :password, :string, virtual: true
		field :password_hash, :string
		field :first_name, :string
		field :last_name, :string
		field :license_number, :string
		field :phone, :string
		field :user_type, :integer, default: 0

		timestamps
	end
end