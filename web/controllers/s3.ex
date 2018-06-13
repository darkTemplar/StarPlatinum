defmodule Offerdate.S3 do
  use Offerdate.Web, :controller
  alias ExAws.S3

  def upload_images(images_base64) do
    images_base64
    |> Enum.map(&Offerdate.S3.upload_image/1)
  end

  @spec upload_image(String.t) :: s3_url :: String.t
  def upload_image(image_base64) do
    image_bucket = System.get_env("S3_IMAGE_BUCKET_NAME")
  
    # Decode the image
    {:ok, image_binary} = Base.decode64(image_base64)

    # Generate a unique filename
    filename =
      image_binary
      |> image_extension()
      |> unique_filename()
          
    # Upload to S3
    {:ok, response} = 
      S3.put_object(image_bucket, filename, image_binary)
      |> ExAws.request()
    
    # convert headers from list of 2 elem tuples to a map
    headers = response[:headers] |> Enum.into(%{})
    {image_size, _} = Float.parse(headers["Content-Length"]) 
    %{:url => "https://#{image_bucket}.s3.amazonaws.com/#{filename}", 
    :etag => headers["ETag"], :size => image_size}
  end
  
  # Generates a unique filename with a given extension
  defp unique_filename(extension) do
    UUID.uuid4(:hex) <> extension
  end
  
  # Helper functions to read the binary to determine the image extension
  defp image_extension(<<0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, _::binary>>), do: ".png"
  defp image_extension(<<0xff, 0xD8, _::binary>>), do: ".jpg"
end
