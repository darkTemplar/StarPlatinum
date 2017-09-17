module View exposing (root)

import CreateListing.Address.View as Address exposing (root)
import CreateListing.ListingDetails.View as ListingDetails exposing (root)
import CreateListing.Contingency.View as Contingency exposing (root)
import CreateListing.PropertyCondition.View as PropertyCondition exposing (root)
import CreateListing.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)




root: Model -> Html Msg
root model = 
    case model.page of 
        NotFound ->
            div [ class "main" ]
                [ h1 []
                    [ text "Sorry the page you are looking for was not found!" ]
                ]
        AddressPage ->
            Html.map AddressPageMsg (Address.root model.address)
        ListingDetailsPage ->
            Html.map ListingDetailsPageMsg (ListingDetails.root model.listingDetails)
        ContingencyPage ->
            Html.map ContingencyPageMsg (Contingency.root model.contingency)
        PropertyConditionPage ->
            Html.map PropertyConditionPageMsg (PropertyCondition.root model.propertyCondition)





