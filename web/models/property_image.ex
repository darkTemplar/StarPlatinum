defmodule Offerdate.PropertyImage do
	use Offerdate.Web, :model

	schema "property_images" do
		field :url, :string
		belongs_to :property, Offerdate.Property
		field :etag, :string
		field :size, :float

		timestamps()
	end

	@allowed_fields ~w(url etag size)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> validate_required([:url, :etag, :size])
	end
end