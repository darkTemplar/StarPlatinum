module CreateListing.ListingDetails.Types exposing (..)

import Date exposing (..)

type alias ListingDetails = {
    listPrice: Float,
    purchasePrice: Float,
    offerDate: Date,
    escrowDate: Date,
    beds: Float,
    bath: Float,
    area: Float
}