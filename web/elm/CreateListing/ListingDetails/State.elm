module CreateListing.ListingDetails.State exposing (init, update)

import CreateListing.ListingDetails.Types exposing (..)
import Utils exposing (stringToFloat)



init: ListingDetails
init = {
    listPrice = 0.0,
    purchasePrice = 0.0,
    offerDate = Nothing,
    offerTime = Nothing,
    escrowDate = Nothing,
    beds = 0.0,
    baths = 0.0,
    area = 0.0}

-- TODO: fix all date inputs
update: ListingMsg -> ListingDetails -> (ListingDetails, Cmd msg)
update msg listingDetails = 
    case msg of 
        ListPrice price ->
            ({listingDetails| listPrice = stringToFloat price}, Cmd.none)
        PurchasePrice price ->
            ({listingDetails| purchasePrice = stringToFloat price}, Cmd.none)
        OfferDate date ->
            (listingDetails, Cmd.none)
        OfferTime time ->
            (listingDetails, Cmd.none)
        EscrowDate date ->
            (listingDetails, Cmd.none)
        Beds input ->
            ({listingDetails | beds = stringToFloat input}, Cmd.none)
        Baths input -> 
            ({listingDetails | baths = stringToFloat input}, Cmd.none)
        Area input -> 
            ({listingDetails| area = stringToFloat input}, Cmd.none)
        Continue -> 
            (listingDetails, Cmd.none)
        Back -> 
            (listingDetails, Cmd.none)


