# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Offerdate.Repo.insert!(%Offerdate.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Offerdate.User
alias Offerdate.Property
alias Offerdate.Listing

User.create_user(%{
  email: "abhas@offerdate.com",
  password: "password",
  first_name: "Abhas",
  last_name: "Sinha",
  license_numer: "all123",
  phone: "6073428695"
})
