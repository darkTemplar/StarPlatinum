defmodule Offerdate.Document do
	use Offerdate.Web, :model

	schema "documents" do
		belongs_to :user, Offerdate.User
		belongs_to :listing, Offerdate.Listing
		field :type, :integer
		field :url, :string
		field :description, :string
		field :etag, :string
		field :size, :float

		timestamps()
	end

	@allowed_fields ~w(type description)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> cast_assoc(:user, required: true)
		|> cast_assoc(:listing, required: true)
		|> put_s3_link()
		|> validate_required([:type, :url, :etag, :size])
	end

	defp put_s3_link(changeset) do
		case changeset do
			%Ecto.Changeset{valid?: true, changes: changes} -> 
				put_change(changeset, :address_hash, 
					:crypto.hash(:sha256, Map.values(changes)) |> Base.encode16)
			_ -> changeset
		end
	end
end