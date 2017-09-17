module CreateListing.Contingency.View exposing (root)

import CreateListing.Contingency.Types exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


root: Contingency -> Html ContingencyMsg
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
                                            checked contingency.financing, onClick ToggleFinancing] []
                                            
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "financingLength", onInput FinancingDays] [],
                                            text "Days"
                                        ]
                                    ],
                                    div [class "form-check col-md-6"] [
                                        label [class "form-check-label"][
                                            text "Appraisal",
                                            input [type_ "checkbox", class "form-check-input", id "appraisal",
                                            checked contingency.appraisal, onClick ToggleAppraisal] []
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "appraisalLength", onInput AppraisalDays] [],
                                            text "Days"
                                        ]
                                    ] 
                                ],
                                div [class "form-row"] [
                                    div [class "form-check col-md-6"] [
                                        label [class "form-check-label"][
                                            text "Property Condition",
                                            input [type_ "checkbox", class "form-check-input", id "propertyCondition",
                                            checked contingency.condition, onClick ToggleCondition] []
                                        ],
                                        label [][
                                            text "Contingency length",
                                            input [type_ "text", placeholder "10", class "form-control", id "propertyConditionLength", onInput ConditionDays] [],
                                            text "Days"
                                        ]
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