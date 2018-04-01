defmodule Offerdate.S3View do
  use Offerdate.Web, :view

  def render("create.json", %{signature: signature}) do
    signature
  end
end
