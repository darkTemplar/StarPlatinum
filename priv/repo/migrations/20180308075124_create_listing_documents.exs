defmodule Offerdate.Repo.Migrations.CreateListingDocuments do
  use Ecto.Migration

  def change do
    create table(:listing_documents) do
      add(:listing_id, references(:listings, on_delete: :nothing), null: false)
      add(:type, :integer, null: false)
      add(:url, :string, null: false)
      add(:etag, :string)
      add(:size, :float)
      timestamps()
    end

    create(index(:listing_documents, [:listing_id]))
    create(index(:listing_documents, [:listing_id, :type]))
    create(index(:listing_documents, [:type]))
  end
end
