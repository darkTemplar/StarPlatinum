module CreateListing.ListingDetails.View exposing (root)

import CreateListing.Types exposing (..)
import CreateListing.ListingDetails.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)



root: ListingDetails -> Html Msg
root listingDetails = 
    div [class "modal-fade"][
            div [class "modal-dialog"][
                div [class "modal-content"][
                    div [class "modal-header"][
                        h5 [class "modal-title"] [text "Property Details"]
                    ],
                    div [class "modal-body"][
                        div [class "container-fluid"][
                            Html.form [][
                                div [class "form-row"] [
                                    div [class "form-group col-md-4"] [
                                        input [type_ "text", placeholder "List Price", class "form-control", id "listPrice", 
                                        value (toString listingDetails.listPrice)] []
                                    ],
                                    div [class "form-group col-md-4"] [
                                        input [type_ "date", placeholder "Date", class "form-control", id "offerDate", 
                                        value (toString listingDetails.offerDate)] []
                                    ],
                                    div [class "form-group col-md-4"] [
                                        input [type_ "text", placeholder "Time", class "form-control", id "time", 
                                        value (toString listingDetails.offerDate)] []
                                    ]
                                ],
                                div [class "form-row"] [
                                    div [class "form-group col-md-8"] [
                                        input [type_ "text", placeholder "Purchase Price", class "form-control", id "purchasePrice", 
                                        value (toString listingDetails.listPrice)] []
                                    ],
                                    div [class "form-group col-md-4"] [
                                        input [type_ "date", placeholder "Escrow Date", class "form-control", id "escrowDate", 
                                        value (toString listingDetails.escrowDate)] []
                                    ]
                                ],
                                div [class "form-row"][
                                    div [class "form-group col-md-4"] [
                                        input [type_ "text", placeholder "Beds", class "form-control", id "bed", 
                                        value (toString listingDetails.beds)] []
                                    ],
                                    div [class "form-group col-md-4"] [
                                        input [type_ "text", placeholder "Baths", class "form-control", id "bath", 
                                        value (toString listingDetails.bath)] []
                                    ],
                                    div [class "form-group col-md-4"] [
                                        input [type_ "text", placeholder "Area sq ft", class "form-control", id "area", 
                                        value (toString listingDetails.area)] []
                                    ]
                                ]

                            ]
                        ]
                    ],
                    div [class "modal-footer"] [
                        div [class "footer-content"] [
                            button [type_ "button", class "btn btn-secondary", onClick PricingChangeBack] [text "Go Back"],
                            button [type_ "button", class "btn btn-primary", onClick PricingChangeContinue] [text "Continue"]

                        ]
                    ]
                ]
            ]
        ]
