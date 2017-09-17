module CreateListing.PropertyCondition.Types exposing (..)


type alias PropertyCondition = {
    asIs: Bool,
    buyerPays: Bool,
    sellerObligation: Bool
}

type PropertyConditionMsg = ToggleAsIs
    | ToggleBuyerPays
    | ToggleSellerObligation
    | Back
    | Continue