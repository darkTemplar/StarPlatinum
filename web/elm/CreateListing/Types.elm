module CreateListing.Types exposing (..)

import CreateListing.Address.Types exposing (Address, AddressMsg)
import CreateListing.ListingDetails.Types exposing (ListingDetails, ListingMsg)
import CreateListing.Contingency.Types exposing (Contingency, ContingencyMsg)
import CreateListing.PropertyCondition.Types exposing (PropertyCondition, PropertyConditionMsg)



-- listing/new/<modal step>  


listingDetails: String
listingDetails = "/listingDetails"

address: String
address = "/address"

contingency: String
contingency = "/contingency"

propertyCondition: String
propertyCondition = "/propertyCondition"


type Subroute = AddressRoute
    | ListingDetailsRoute
    | ContingencyRoute
    | PropertyConditionRoute
    | NotFoundRoute

type alias Model = {
    subroute: Subroute,
    address: Address,
    listingDetails: ListingDetails,
    contingency: Contingency,
    propertyCondition: PropertyCondition,
    error: Maybe String
    }

type Msg = 
    AddressPageMsg AddressMsg
    | ListingDetailsPageMsg ListingMsg
    | ContingencyPageMsg ContingencyMsg
    | PropertyConditionPageMsg PropertyConditionMsg



