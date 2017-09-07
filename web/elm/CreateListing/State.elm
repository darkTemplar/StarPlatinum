module CreateListing.State exposing (init, update)

import CreateListing.Types exposing (..)
import CreateListing.Rest exposing (..)
import Navigation exposing (..)
import Date exposing (..)


initAddress: Address
initAddress = {
    street = "",
    unit = "",
    city = "",
    state = "",
    country = "",
    lat = "",
    long = "",
    zip = ""
}

initListingDetails: ListingDetails
initListingDetails = {
    listPrice = 0.0,
    purchasePrice = 0.0,
    offerDate = Date.fromTime 0,
    escrowDate = Date.fromTime 0,
    beds = 0.0,
    bath = 0.0,
    area = 0.0
}

initContingency: Contingency
initContingency = {
    financing = True,
    financingDays = 10,
    appraisal = True,
    appraisalDays = 10,
    condition = True,
    conditionDays = 10
}

initPropertyCondition: PropertyCondition
initPropertyCondition = {
    asIs = True,
    buyerPays = True,
    sellerObligation = True
}

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
        AddressChangeContinue ->
            (model, Cmd.none)
        AddressChangeBack page -> 
            (model, Cmd.none)
        ListingDetailsChangeContinue ->
            (model, Cmd.none)
        ListingDetailsChangeBack -> 
            (model, Cmd.none)
        PricingChangeContinue ->
            (model, Cmd.none)
        PricingChangeBack -> 
            (model, Cmd.none)
        ContingencyChangeContinue ->
            (model, Cmd.none)
        ContingencyChangeBack -> 
            (model, Cmd.none)
        PropertyConditionChangeContinue ->
            (model, Cmd.none)
        PropertyConditionChangeBack -> 
            (model, Cmd.none)

    



-- subscriptions
