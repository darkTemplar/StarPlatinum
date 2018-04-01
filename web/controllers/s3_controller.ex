defmodule Offerdate.S3Controller do
  use Offerdate.Web, :controller

  def create(conn, %{"filename" => filename, "mimetype" => mimetype}) do
    conn
    |> put_status(:created)
    |> render("create.json", signature: sign(filename, mimetype))
  end

  defp sign(filename, mimetype) do
    policy = policy(filename, mimetype)

    %{
      key: filename,
      "Content-Type": mimetype,
      acl: "public-read",
      success_action_status: "201",
      action: "https://s3.amazonaws.com/#{Application.get_env(:s3, :image_bucket_name)}",
      AWSAccessKeyId: Application.get_env(:s3, :aws_access_key_id),
      policy: policy,
      signature: hmac_sha1(Application.get_env(:s3, :aws_secret_access_key), policy)
    }
  end

  defp now_plus(minutes) do
    import Timex

    now
    |> shift(minutes: minutes)
    |> format!("{ISO:Extended:Z}")
  end

  defp hmac_sha1(secret, msg) do
    :crypto.hmac(:sha, secret, msg)
    |> Base.encode64()
  end

  defp policy(key, mimetype, expiration_window \\ 60) do
    %{
      # This policy is valid for an hour by default.
      expiration: now_plus(expiration_window),
      conditions: [
        # You can only upload to the bucket we specify.
        %{bucket: System.get_env("S3_BUCKET_NAME")},
        # The uploaded file must be publicly readable.
        %{acl: "public-read"},
        # You have to upload the mime type you said you would upload.
        ["starts-with", "$Content-Type", mimetype],
        # You have to upload the file name you said you would upload.
        ["starts-with", "$key", key],
        # When things work out ok, AWS should send a 201 response.
        %{success_action_status: "201"}
      ]
    }
    # Let's make this into JSON.
    |> Poison.encode!()
    # We also need to base64 encode it.
    |> Base.encode64()
  end
end
