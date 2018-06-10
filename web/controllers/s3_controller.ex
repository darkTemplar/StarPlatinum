defmodule Offerdate.S3Controller do
  use Offerdate.Web, :controller
  use UUID
  alias ExAws

  def upload(%{file => file}) do
  file_extension = Path.extname(file.filename)
  file_uuid = UUID.uuid4(:hex)
  s3_filename = "#{file_uuid}.#{file_extension}"
  s3_bucket = System.get.env("S3_IMAGE_BUCKET_NAME")
  # Load the file into memory
  {:ok, file_binary} = File.read(file.path)

  # Upload the file to S3
  {:ok, _} = 
    ExAws.S3.put_object(s3_bucket, s3_filename, file_binary)
    |> ExAws.request()

  put_flash(:success, "File uploaded successfully!")
  |> render("upload.html")
  end
end
