defmodule Offerdate.Participant do
	use Offerdate.Web, :model

	schema "participants" do
		belongs_to :listing, Offerdate.Listing
		field :type, :integer
		field :bid, :map
		timestamps()
	end

	@allowed_fields ~w(type, bid)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> cast_assoc(:listing, required: true)
		|> validate_required([:type])
	end

end