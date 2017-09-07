module CreateListing.Address.Types exposing (..)


type alias Address = {
    street: String,
    unit: String,
    city: String,
    state: String,
    country: String,
    lat: String,
    long: String,
    zip: String
}