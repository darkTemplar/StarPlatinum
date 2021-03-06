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
alias Offerdate.Role
alias Offerdate.Property
alias Offerdate.Listing

role = Role.create_role(%{
    name: "Buyer"
  })

IO.inspect "#{role.id}"

user =
  User.create_user(%{
    email: "abhas@offerdate.com",
    password: "password",
    first_name: "Abhas",
    last_name: "Sinha",
    license_numer: "all123",
    phone: "6073428695",
    role_id: role.id
  })

property =
  Property.create_property(%{
    street_number: "725",
    route: "Roble Avenue",
    unit_number: "Apt 9",
    city: "Menlo Park",
    state: "CA",
    country: "USA",
    postal_code: "94025",
    place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4"
  })

IO.inspect("#{user.id}")

Listing.create_listing(%{
  listing_price: 140_000.5,
  user_id: user.id,
  property_id: property.id,
  initial_expiry: ~N[2018-03-07 23:00:07],
  final_expiry: ~N[2018-03-11 23:00:07],
  beds: 2,
  baths: 2,
  area: 5000.5
})

Listing.create_listing(%{
  listing_price: 340_000.5,
  user_id: user.id,
  property_id: property.id,
  initial_expiry: ~N[2019-03-07 23:00:07],
  final_expiry: ~N[2019-03-11 23:00:07],
  beds: 3,
  baths: 2,
  area: 5000.5
})
