defmodule Offerdate.Listing do
	use Offerdate.Web, :model

	schema "listings" do
		field :listing_price, :float
		field :sale_price, :float
		belongs_to :user, Offerdate.User
		belongs_to :property, Offerdate.Property
		field :beds, :integer
		field :baths, :integer
		field :area, :float

		timestamps()
	end

	@allowed_fields ~w(listing_price sale_price beds bath area)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> validate_required([:listing_price, :bed, :bath, :area])
	end
end