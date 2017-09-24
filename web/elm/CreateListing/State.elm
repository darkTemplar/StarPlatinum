module CreateListing.State exposing (initModel, update, updateSubroute, parseSubpath)
import CreateListing.Types exposing (..)
--import CreateListing.Rest exposing (..)
import CreateListing.Address.State as Address exposing (update, init)
import CreateListing.ListingDetails.State as ListingDetails exposing (update, init)
import CreateListing.Contingency.State as Contingency exposing (update, init)
import CreateListing.PropertyCondition.State as PropertyCondition exposing (update, init)

initModel: Model
initModel = {
    subroute = AddressRoute,
    address = Address.init,
    listingDetails = ListingDetails.init,
    contingency = Contingency.init,
    propertyCondition = PropertyCondition.init,
    error = Nothing}

updateSubroute: Subroute -> Model -> Model
updateSubroute subroute model =
    {model | subroute = subroute} 


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddressPageMsg msg ->
            let
                (address, addressCmd) = Address.update msg model.address
                    
            in
                ({model | address = address}, Cmd.batch[Cmd.map AddressPageMsg addressCmd])
                    
        ListingDetailsPageMsg msg ->
           let
                (listingDetails, listingDetailsCmd) = ListingDetails.update msg model.listingDetails
                    
            in 
                ({model | listingDetails = listingDetails}, Cmd.batch[Cmd.map ListingDetailsPageMsg listingDetailsCmd])
        ContingencyPageMsg msg ->
            let
                (contingency, contingencyCmd) = Contingency.update msg model.contingency
                    
            in
                ({model | contingency = contingency}, Cmd.batch[Cmd.map ContingencyPageMsg contingencyCmd])
        PropertyConditionPageMsg msg -> 
            let
                (propertyCondition, propertyConditionCmd) = PropertyCondition.update msg model.propertyCondition
                    
            in
                ({model | propertyCondition = propertyCondition}, Cmd.batch[Cmd.map PropertyConditionPageMsg propertyConditionCmd])


parseSubpath : String -> Subroute
parseSubpath subpath =
    case subpath of
        "address" ->
            AddressRoute
        "listingDetails" ->
            ListingDetailsRoute
        "contingency" ->
            ContingencyRoute
        "propertyCondition" ->
            PropertyConditionRoute   
        _ ->
            NotFoundRoute

