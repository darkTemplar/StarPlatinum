# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :offerdate, ecto_repos: [Offerdate.Repo]

# Configures the endpoint
config :offerdate, Offerdate.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "o0mxuUyfsnhKZDxgr/vN17X2yR2rQevQpqxbR9ixmePKSSiYE7aX/yL/RyfQoUxi",
  render_errors: [view: Offerdate.ErrorView, format: "json", accepts: ~w(json)],
  pubsub: [name: Offerdate.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY"),
  issuer: "Offerdate",
  verify_issuer: true,
  ttl: {30, :days},
  allowed_drift: 2000,
  serializer: Offerdate.GuardianSerializer

config :mix_docker, image: "offerdate"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
