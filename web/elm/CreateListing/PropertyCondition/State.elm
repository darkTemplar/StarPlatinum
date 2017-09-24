import module CreateListing.PropertyCondition.State exposing (update)

import CreateListing.PropertyCondition.Types exposing (..)

initPropertyCondition: PropertyCondition
initPropertyCondition = {
    asIs = True,
    buyerPays = True,
    sellerObligation = True
}

update: PropertyConditionMsg -> PropertyCondition -> (PropertyCondition, Cmd msg
update msg propertyCondition = case msg of 
    ToggleAsIs -> 
        ({propertyCondition | asIs = not propertyCondition.asIs}, Cmd.none)
    ToggleSellerObligation -> 
        ({propertyCondition | sellerObligation = not propertyCondition.sellerObligation}, Cmd.none)
    ToggleBuyerPays -> 
        ({propertyCondition | buyerPays = not propertyCondition.buyerPays}, Cmd.none)
    Continue -> 
        (propertyCondition, Cmd.none)
    Back ->
        (propertyCondition, Cmd.none)