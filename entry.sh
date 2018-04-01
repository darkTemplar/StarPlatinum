#!/bin/bash
# entrypoint.sh

# Docker entry script.

# Wait until Postgres is ready
while ! pg_isready -q -h $DB_HOSTNAME -p $DB_PORT -U $DB_USERNAME
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $DB_NAME"` ]]; then
  echo "Database $DB_NAME does not exist. Creating..."
  createdb -E UTF8 $DB_NAME -l en_US.UTF-8 -T template0
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $DB_NAME created."
fi

exec mix phx.server