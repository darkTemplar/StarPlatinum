defmodule Offerdate.PropertyImage do
	use Offerdate.Web, :model

	schema "property_images" do
		field :url, :string
		belongs_to :property, Offerdate.Property
		field :etag, :string
		field :size, :float

		timestamps()
	end

	@allowed_fields ~w()

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> cast_assoc(:property, required: true)
		|> put_s3_link()
		|> validate_required([:url, :etag, :size])
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