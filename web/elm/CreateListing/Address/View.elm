module CreateListing.Address.View exposing (root)

import CreateListing.Types exposing (..)
import CreateListing.Address.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

formatAddress: Address -> String
formatAddress address = 
    address.street ++ 
        ", " ++ address.unit ++ 
        ", " ++ address.city ++ 
        ", " ++ address.state ++ 
        ", " ++ address.country 


root: Address -> Html Msg
root address =
    div [class "modal-fade"][
            div [class "modal-dialog"][
                div [class "modal-content"][
                    div [class "modal-header"][
                        h5 [class "modal-title"] [text "Property Info"]
                    ],
                    div [class "modal-body"][
                        div [class "container-fluid"][
                            Html.form [][
                                div [class "form-group"] [
                                    input [type_ "text", placeholder "Address", class "form-control", id "address", 
                                    value (formatAddress address)] []
                                ]
                            ]
                        ]
                    ],
                    div [class "modal-footer"] [
                        div [class "footer-content"] [
                            button [type_ "button", class "btn btn-secondary", onClick AddressChangeBack] [text "Go Back"],
                            button [type_ "button", class "btn btn-primary btn-block", onClick AddressChangeContinue] [text "Continue"]
                        ]
                    ]
                ]
            ]
        ]