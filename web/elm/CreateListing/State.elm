module CreateListing.State exposing (init, update)

import CreateListing.Types exposing (..)
import CreateListing.Rest exposing (..)
import Navigation exposing (..)
import Date exposing (..)


init: Model
init = {
    page = AddressPage,
    address = initAddress,
    listingDetails = initListingDetails,
    contingency = initContingency,
    propertyCondition = initPropertyCondition,
    error = Nothing
}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate page ->
            ( model, Navigation.newUrl <| pageToHash model.page)
        ChangePage page ->
            ( { model | page = page }, Cmd.none )
        AddressPageMsg msg ->
            (model, Cmd.none)
        ListingDetailsPageMsg msg ->
            (model, Cmd.none) 
        ContingencyPageMsg msg ->
            (model, Cmd.none)
        PropertyConditionPageMsg msg -> 
            (model, Cmd.none)

    



-- subscriptions
