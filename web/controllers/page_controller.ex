defmodule Offerdate.PageController do
  use Offerdate.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
