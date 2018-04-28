defmodule Offerdate.Repo do
  @moduledoc """
  In memory repo
  """
  use Ecto.Repo, otp_app: :offerdate

  def init(_, config) do
    config =
      config
      |> Keyword.put(:username, System.get_env("POSTGRES_USER"))
      |> Keyword.put(:password, System.get_env("POSTGRES_PASSWORD"))
      |> Keyword.put(:database, System.get_env("POSTGRES_DATABASE"))
      |> Keyword.put(:hostname, System.get_env("POSTGRES_HOST"))

    {:ok, config}
  end
end
