defmodule Offerdate.TimeUtils do
	
	def unix_to_naive_datetime(timestamp) do
		timestamp = if is_integer(timestamp) do 
						timestamp 
					else
						timestamp |> Integer.parse |> elem(0)
					end
    	case DateTime.from_unix(timestamp) do
      		{:ok, date} -> DateTime.to_naive(date)
      		{:error, reason} -> nil
    	end
  	end


end