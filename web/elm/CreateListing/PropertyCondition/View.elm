module CreateListing.PropertyCondition.View exposing (root)

import CreateListing.PropertyCondition.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


root: PropertyCondition -> Html PropertyConditionMsg
root propertyCondition = 
    div [class "modal-fade"][
            div [class "modal-dialog"][
                div [class "modal-content"][
                    div [class "modal-header"][
                        h5 [class "modal-title"] [text "Property Details"]
                    ],
                    div [class "modal-body"][
                        div [class "container-fluid"][
                            Html.form [][
                                div [class "form-group"] [
                                    label [class "form-check-label"][
                                        text "As is",
                                        input [type_ "checkbox", class "form-check-input", id "asIs", checked propertyCondition.asIs,
                                        onClick ToggleAsIs] []
                                    ]
                                ],
                                div [class "form-group"] [
                                    label [class "form-check-label"][
                                        text "Buyer pays for structural pest control inspection",
                                        input [type_ "checkbox", class "form-check-input", id "appraisal", checked propertyCondition.buyerPays,
                                        onClick ToggleBuyerPays] []
                                    ]
                                ],
                                div [class "form-group"] [
                                    label [class "form-check-label"][
                                        text "Seller obligation to repair and correct",
                                        input [type_ "checkbox", class "form-check-input", id "appraisal", checked propertyCondition.sellerObligation,
                                        onClick ToggleSellerObligation] []
                                    ]
                                ]
                            ]
                        ]
                    ],
                    div [class "modal-footer"] [
                        div [class "footer-content"] [
                            button [type_ "button", class "btn btn-secondary", onClick Back] [text "Go Back"],
                            button [type_ "button", class "btn btn-primary", onClick Continue] [text "Continue"]

                        ]
                    ]
                ]
            ]
        ]