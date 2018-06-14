defmodule Offerdate.S3 do
  use Offerdate.Web, :controller
  alias ExAws.S3

  def upload_files(files) do
    files
    |> Enum.map(&Offerdate.S3.upload_file/1)
  end

  #@spec upload_file(String.t) :: s3_url :: String.t
  def upload_file([file_base64, file_type]) do
    bucket = System.get_env("S3_IMAGE_BUCKET_NAME")
  
    # Decode the image
    {:ok, binary} = Base.decode64(file_base64)

    # Generate a unique filename depending on file_type
    filename = case file_type do
      1 -> 
        binary
        |> image_extension()
        |> unique_filename()
       _ ->
        unique_filename()
    end    
    # Upload to S3
    {:ok, response} = 
      S3.put_object(bucket, filename, binary)
      |> ExAws.request()
    
    # convert headers from list of 2 elem tuples to a map
    headers = response[:headers] |> Enum.into(%{})
    {size, _} = Float.parse(headers["Content-Length"]) 
    %{:url => "https://#{bucket}.s3.amazonaws.com/#{filename}", 
    :etag => headers["ETag"], :size => size, :type => file_type}
  end
  
  # Generates a unique filename with a given extension
  defp unique_filename(extension \\ ".pdf") do
    UUID.uuid4(:hex) <> extension
  end

  # Helper functions to read the binary to determine the image extension
  defp image_extension(<<0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, _::binary>>), do: ".png"
  defp image_extension(<<0xff, 0xD8, _::binary>>), do: ".jpg"
end
