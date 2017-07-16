use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :offerdate, Offerdate.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :offerdate, Offerdate.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "",
  database: "star_platinum",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :offerdate, Offerdate.Bing
  maps_api_key: "Air2dQkNqDck-auUQQXKRleBoDP_JB2ynxgRhQVzql2s3bqKoPADfPtPpQ4V4KeL"
