module CreateListing.Address.State exposing (update)

import CreateListing.Address.Types exposing (..)

initAddress: Address
initAddress = {
    street = "",
    unit = "",
    city = "",
    state = "",
    country = "",
    lat = "",
    long = "",
    zip = ""}

update: AddressMsg -> Address -> (Address, Cmd msg)
update msg address = 
    case msg of 
        AddressChange newAddress ->
            (address, Cmd.none)
        Geolocate -> 
            (address, Cmd.none)
        Continue ->
            (address, Cmd.none)
        Back ->
            (address, Cmd.none)

