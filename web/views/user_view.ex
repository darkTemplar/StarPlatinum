defmodule Offerdate.UserView do
  use Offerdate.Web, :view
  alias Offerdate.User

  def full_name(%User{first_name: first_name, last_name: last_name}) do 
  	first_name <> " " <> last_name
  end
end