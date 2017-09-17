module CreateListing.Types exposing (..)

import CreateListing.Address.Types exposing (..)
import CreateListing.ListingDetails.Types exposing (..)
import CreateListing.Contingency.Types exposing (..)
import CreateListing.PropertyCondition.Types exposing (..)



type alias Model = {
    page : Page,
    address: Address,
    listingDetails: ListingDetails,
    contingency: Contingency,
    propertyCondition: PropertyCondition,
    error: Maybe String
    }


type Page = NotFound
    | AddressPage
    | ListingDetailsPage
    | ContingencyPage
    | PropertyConditionPage


type Msg = Navigate Page
    | ChangePage Page
    | AddressPageMsg AddressMsg
    | ListingDetailsPageMsg ListingMsg
    | ContingencyPageMsg ContingencyMsg
    | PropertyConditionPageMsg PropertyConditionMsg