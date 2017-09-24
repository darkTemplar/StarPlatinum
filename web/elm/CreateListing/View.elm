module CreateListing.View exposing (root)

import CreateListing.Address.View as AddressView exposing (root)
import CreateListing.ListingDetails.View as ListingDetailsView exposing (root)
import CreateListing.Contingency.View as ContingencyView exposing (root)
import CreateListing.PropertyCondition.View as PropertyConditionView exposing (root)
import CreateListing.Types exposing (..)

import Html exposing (..)
import Utils exposing (notFoundView)




root: Model -> Html Msg
root model = 
    -- subRoute cannot be string
    case model.subroute of 
        AddressRoute ->
            Html.map AddressPageMsg (AddressView.root model.address)
        ListingDetailsRoute ->
            Html.map ListingDetailsPageMsg (ListingDetailsView.root model.listingDetails)
        ContingencyRoute ->
            Html.map ContingencyPageMsg (ContingencyView.root model.contingency)
        PropertyConditionRoute ->
            Html.map PropertyConditionPageMsg (PropertyConditionView.root model.propertyCondition)
        NotFoundRoute ->
            notFoundView






