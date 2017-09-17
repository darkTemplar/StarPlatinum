module CreateListing.ListingDetails.Types exposing (..)

import Date exposing (..)
import Time exposing (..)

type alias ListingDetails = {
    listPrice: Float,
    purchasePrice: Float,
    offerDate: Maybe Date,
    offerTime: Maybe Time,
    escrowDate: Maybe Date,
    beds: Float,
    baths: Float,
    area: Float
}

type ListingMsg = 
    ListPrice String
    | OfferDate String
    | OfferTime String
    | PurchasePrice String
    | EscrowDate String
    | Beds String
    | Baths String
    | Area String
    | Back
    | Continue