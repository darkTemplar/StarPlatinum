# Dockerfile
FROM elixir:1.4.2
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /app
COPY . /app
ENV HOME=/app/ TERM=xterm
# Install postgres-client to check if postgres is running
RUN apt-get update && \
  apt-get install -y postgresql-client
# Install Hex+Rebar
RUN mix local.hex --force && \
    mix local.rebar --force
WORKDIR /app
EXPOSE 4000
ENV PORT=4000 MIX_ENV=prod REPLACE_OS_VARS=true SHELL=/bin/bash
# Cache elixir deps
COPY mix.exs mix.lock ./
RUN mix deps.get
COPY config ./config
RUN mix deps.compile
COPY . .
#RUN mix release --env=prod
CMD ["/app/entry.sh"]