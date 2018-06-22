defmodule Offerdate.GoogleController do
  alias __MODULE__
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

  def get_geometry(place_id) do
    input_params = %{:place_id => place_id, :key => System.get_env("GOOGLE_MAPS_API_KEY")}
    url = System.get_env("GOOGLE_PLACES_DETAILS_URL") <> "?" <> URI.encode_query(input_params)
    case HTTPoison.get(url) do
        {:ok, %{status_code: 200, body: body}} ->
          Poison.decode!(body)
          |> get_in(["result", "geometry"])

        {:ok, %{status_code: 404}} ->
          %{}

        {:error, %{reason: reason}} ->
          %{}
    end
  end

  def get_place_details(place_id) do
    input_params = %{:place_id => place_id, :key => System.get_env("GOOGLE_MAPS_API_KEY"), :types => "address"}
    url = System.get_env("GOOGLE_PLACES_DETAILS_URL") <> "?" <> URI.encode_query(input_params)
    case HTTPoison.get(url) do
        {:ok, %{status_code: 200, body: body}} ->
          Poison.decode!(body)
          |> get_in(["result", "address_components"])
          |> Enum.map(&GoogleController.parse_address_components/1)
          |> Enum.reduce(%{}, fn (x, acc) -> Map.merge(x, acc) end)

        {:ok, %{status_code: 404}} ->
          %{}

        {:error, %{reason: reason}} ->
          %{}
    end
  end

  def parse_address_components(%{"types" => types, "long_name" => long_name, "short_name" => short_name}) do
    case types do
      ["street_number"] ->
        %{"street_number" => long_name}
      ["route"] ->
        %{"route" => long_name}
      ["locality"| _] -> 
        %{"city" => long_name}
      ["administrative_area_level_1"| _] ->
        %{"state" => short_name}
      ["country"| _] ->
        %{"country" => short_name}
      ["postal_code"] ->
        %{"postal_code" => short_name}
      _ ->
        %{}
    end
  end

end