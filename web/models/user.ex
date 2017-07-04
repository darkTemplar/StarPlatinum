defmodule Offerdate.User do
	use Offerdate.Web, :model
	import Comeonin.Bcrypt, only: [hashpwsalt: 1]

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

	@allowed_fields ~w(email password first_name last_name license_number phone user_type)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> validate_required([:email, :password])
		|> validate_format(:email, ~r/@/)
		|> unique_constraint(:email)
		|> validate_length(:password, min: 8)
		|> put_pass_hash()
	end

	defp put_pass_hash(changeset) do
		case changeset do
			%Ecto.Changeset{valid?: true, changes: %{password: pass}} -> 
				put_change(changeset, :password_hash, hashpwsalt(pass))
			_ -> changeset
		end
	end

	def full_name(user) do
		cond do
			user.first_name && user.last_name -> 
				user.first_name <> " " <> user.last_name
			user.first_name -> user.first_name
			true -> ""
		end
	end
end