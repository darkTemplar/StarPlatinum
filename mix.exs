defmodule Offerdate.Mixfile do
  use Mix.Project

  def project do
    [
      app: :offerdate,
      version: "0.0.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Offerdate, []},
      applications: [
        :phoenix,
        :phoenix_pubsub,
        :phoenix_html,
        :cowboy,
        :logger,
        :gettext,
        :phoenix_ecto,
        :postgrex,
        :comeonin,
        :httpoison,
        :poison,
        :exredis,
        :timex,
        :ex_aws,
        :ex_aws_s3,
        :hackney,
        :uuid,
        :bamboo
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_), do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.2.4"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:exredis, ">= 0.2.4"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:comeonin, "~> 2.0"},
      {:poison, " ~> 2.0"},
      {:httpoison, "~> 0.9"},
      {:cowboy, "~> 1.0"},
      {:distillery, "~> 1.0", override: true},
      {:timex, "~> 3.1"},
      {:cors_plug, "~> 1.1"},
      {:logger_file_backend, ">=0.0.4"},
      {:ex_aws, "~> 2.0.2"},
      {:ex_aws_s3, "~> 2.0.0"},
      {:hackney, "~> 1.12.1"},
      {:uuid, "~> 1.1"},
      {:bamboo, "~> 1.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
