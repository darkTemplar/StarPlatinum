defmodule Offerdate.PropertyImage do
	use Offerdate.Web, :model
  	alias __MODULE__
	alias Offerdate.Repo
	alias NaiveDateTime

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
		|> assoc_constraint(:property)
		|> validate_required([:url, :etag, :size])
	end

	def insert_from_s3(s3_params, property_id) do
		extra_params = %{:property_id =>property_id, :inserted_at => NaiveDateTime.utc_now(), :updated_at => NaiveDateTime.utc_now()}
		insert_params = s3_params |> 
			Enum.map(fn params -> Map.merge(params, extra_params) end)
		case Repo.insert_all(PropertyImage, insert_params) do
			{0, _} -> 
				{:error, "Insert all failed"}
			{_, val} -> 
				{:ok, val}
		end
	end

end