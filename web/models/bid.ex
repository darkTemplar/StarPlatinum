defmodule Offerdate.Bid do
	use Offerdate.Web, :model

	@derive {Poison.Encoder, only: [:id, :listing_id, :bid, :history]}
	schema "bids" do
		belongs_to :listing, Offerdate.Listing
		field :offer, :map
		field :history, :map
		timestamps()
	end

	@allowed_fields ~w(listing_id offer history)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> cast_assoc(:listing, required: true)
		|> validate_required([:bid])
	end

end