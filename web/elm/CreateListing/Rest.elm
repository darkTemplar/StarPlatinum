module Rest exposing (..)

import CreateListing.Types exposing (..)

import Navigation
import String exposing (toLower)



baseUrl: String
baseUrl = "listings/new/"

pageToHash: Page -> String
pageToHash page = case page of
    AddressPage -> "#/address"
    ListingDetailsPage -> "#/listingDetails"
    ContingencyPage -> "#/contingencies"
    PropertyConditionPage -> "#/propertyCondition" 
    NotFound -> baseUrl ++ "#notFound"

hashToPage: String -> Page
hashToPage hash = case (toLower hash) of
    "/#" -> AddressPage
    "" -> AddressPage
    "#/address" -> AddressPage
    "#/listingDetails" -> ListingDetailsPage
    "#/contingencies" -> ContingencyPage
    "#/propertyCondition" -> PropertyConditionPage
    _ -> NotFound

locationToMsg: Navigation.Location -> Msg
locationToMsg location = 
    location.hash
    |> hashToPage
    |> ChangePage