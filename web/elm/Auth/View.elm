module Auth.View exposing (root, loginForm, signupForm)

import Auth.Types exposing (..)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)


fbLoginBtn : Html Msg
fbLoginBtn =
    div
        [ class "fb-login-button"
        , attribute "data-max-rows" "1"
        , attribute "data-size" "large"
        , attribute "data-button-type" "continue_with"
        , attribute "data-show-faces" "false"
        , attribute "data-auto-logout-link" "false"
        , attribute "data-use-continue-as" "true"
        ]
        []


googleLoginBtn : Html Msg
googleLoginBtn =
    a [] [ text "Continue with Google" ]


signupForm : Html Msg
signupForm =
    Html.form []
        [ div [ class "form-row" ]
            [ div [ class "form-group col-md-6" ]
                [ input [ type_ "text", placeholder "First Name", class "form-control", id "firstName" ] []
                ]
            , div [ class "form-group col-md-6" ]
                [ input [ type_ "text", placeholder "Last Name", class "form-control", id "lastName" ] []
                ]
            ]
        , div [ class "form-group" ]
            [ input [ type_ "text", placeholder "Email", class "form-control", id "email" ] []
            ]
        , div [ class "form-group" ]
            [ input [ type_ "password", placeholder "Password", class "form-control", id "password" ] []
            ]
        , div [ class "form-group" ]
            [ button [ type_ "submit", class "btn btn-primary btn-block" ] [ text "Continue" ]
            ]
        ]


loginForm : Html Msg
loginForm =
    Html.form []
        [ div [ class "form-group" ]
            [ input [ type_ "text", placeholder "Email", class "form-control", id "email" ] []
            ]
        , div [ class "form-group" ]
            [ input [ type_ "password", placeholder "Password", class "form-control", id "password" ] []
            ]
        , div [ class "form-group" ]
            [ button [ type_ "button", class "btn btn-primary btn-block" ] [ text "Continue" ]
            ]
        ]


configureForm : Bool -> ( String, String, String, Html Msg )
configureForm isLogin =
    if isLogin then
        ( "Log In", "Need an account?", "Sign Up", loginForm )
    else
        ( "Sign Up", "Already have an account?", "Log In", signupForm )


root : Model -> Html Msg
root model =
    let
        ( title, footerText, footerCta, mainForm ) =
            configureForm model.isLogin
    in
        div [ class "modal-fade" ]
            [ div [ class "modal-dialog" ]
                [ div [ class "modal-content" ]
                    [ div [ class "modal-header" ]
                        [ h5 [ class "modal-title" ] [ text title ]
                        ]
                    , div [ class "modal-body" ]
                        [ div [ class "container-fluid" ]
                            [ errorPanel model.error
                            , div [ class "row" ]
                                [ fbLoginBtn
                                ]
                            , div [ class "row" ]
                                [ googleLoginBtn
                                ]
                            , hr [] []
                            , mainForm
                            ]
                        ]
                    , div [ class "modal-footer" ]
                        [ div [ class "footer-content" ]
                            [ span [ class "footer-text" ] [ text footerText ]
                            , a [ href "#" ] [ text footerCta ]
                            ]
                        ]
                    ]
                ]
            ]


errorPanel : Maybe String -> Html Msg
errorPanel err =
    case err of
        Just errMsg ->
            div [ class "error" ] [ text errMsg ]

        Nothing ->
            text ""
