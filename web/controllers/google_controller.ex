defmodule Offerdate.GoogleController do
	use Offerdate.Web, :controller
	alias URI

	def get_address_suggestions(conn, params) do
		input_params = %{:input => params["query"], :key => System.get_env("GOOGLE_MAPS_API_KEY"), :types => "address"}
		url = System.get_env("GOOGLE_PLACES_BASE_URL") <> "?" <> URI.encode_query(input_params)
		case HTTPoison.get(url) do
  			{:ok, %{status_code: 200, body: body}} ->
  				conn
  				|> render("success.json", suggestions: Poison.decode!(body))

  			{:ok, %{status_code: 404}} ->
  				conn
    			|> render("error.json", message: "Resource not found")

  			{:error, %{reason: reason}} ->
    			conn
    			|> render("error.json", message: reason)
		end
	end
end