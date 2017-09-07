defmodule Offerdate.Mls do
	use Offerdate.Web, :model

	schema "mls" do
		field :mls, :string
		belongs_to :listing, Offerdate.Listing

		timestamps()
	end

	@allowed_fields ~w(mls)

	def changeset(model, params \\ :invalid) do
		model
		|> cast(params, @allowed_fields)
		|> validate_required([:mls])
		|> unique_constraint(:mls, name: :listing_mls_index)
	end
end