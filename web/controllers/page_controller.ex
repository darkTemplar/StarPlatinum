defmodule Offerdate.PageController do
  use Offerdate.Web, :controller

  def index(conn, _params) do
    html(conn, File.read!("priv/index.html"))
  end
end
