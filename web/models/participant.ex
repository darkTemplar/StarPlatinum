defmodule Offerdate.Participant do
	use Offerdate.Web, :model

	@derive {Poison.Encoder, only: [:id, :user_id, :participant_id, :listing_id]}
	schema "participants" do
		belongs_to :user, Offerdate.User
		belongs_to :participant, Offerdate.User
		belongs_to :listing, Offerdate.Listing
		timestamps()
	end

	@allowed_fields ~w(user_id, participant_id, listing_id)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> cast_assoc(:user, required: true)
		|> cast_assoc(:participant, required: true)
		|> cast_assoc(:listing, required: true)
	end

end