module CreateListing.Contingency.View exposing (root)

import CreateListing.Types exposing (..)
import CreateListing.Contingency.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


root: Contingency -> Html Msg
root contingency = 
    div [class "modal-fade"][
            div [class "modal-dialog"][
                div [class "modal-content"][
                    div [class "modal-header"][
                        h5 [class "modal-title"] [text "Contingencies"]
                    ],
                    div [class "modal-body"][
                        div [class "container-fluid"][
                            Html.form [][
                                div [class "form-row"] [
                                    div [class "form-check col-md-6"] [
                                        label [class "form-check-label"][
                                            text "Financing",
                                            input [type_ "checkbox", class "form-check-input", id "financing", 
                                            checked contingency.financing] []
                                            
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "financingLength"] [],
                                            text "Days"
                                        ]
                                    ],
                                    div [class "form-check col-md-6"] [
                                        label [class "form-check-label"][
                                            text "Appraisal",
                                            input [type_ "checkbox", class "form-check-input", id "appraisal", value "1"] []
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "appraisalLength"] [],
                                            text "Days"
                                        ]
                                    ] 
                                ],
                                div [class "form-row"] [
                                    div [class "form-check col-md-6"] [
                                        label [class "form-check-label"][
                                            text "Property Condition",
                                            input [type_ "checkbox", class "form-check-input", id "propertyCondition", value "1"] []
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "propertyConditionLength"] [],
                                            text "Days"
                                        ]
                                    ]
                                ]

                            ]
                        ]
                    ],
                    div [class "modal-footer"] [
                        div [class "footer-content"] [
                            button [type_ "button", class "btn btn-secondary", onClick ContingencyChangeBack] [text "Go Back"],
                            button [type_ "button", class "btn btn-primary", onClick ContingencyChangeContinue] [text "Continue"]

                        ]
                    ]
                ]
            ]
        ]