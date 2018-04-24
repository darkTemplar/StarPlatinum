use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :offerdate, Offerdate.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    node: ["node_modules/brunch/bin/brunch", "watch", "--stdin", cd: Path.expand("../", __DIR__)]
  ]

# Watch static and templates for browser reloading.
config :offerdate, Offerdate.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :offerdate, Offerdate.Repo,
  adapter: Ecto.Adapters.Postgres,
  hostname: System.get_env("PG_HOST"),
  username: System.get_env("PG_USER"),
  password: System.get_env("PG_PASSWORD"),
  database: System.get_env("PG_DATABASE"),
  pool_size: 10

# s3 config
config :s3,
  aws_access_key_id: System.get_env("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY"),
  image_bucket_name: System.get_env("S3_IMAGE_BUCKET_NAME")

# Bing API Services
config :offerdate, Offerdate.Bing,
  maps_api_key: "Air2dQkNqDck-auUQQXKRleBoDP_JB2ynxgRhQVzql2s3bqKoPADfPtPpQ4V4KeL"

config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")
