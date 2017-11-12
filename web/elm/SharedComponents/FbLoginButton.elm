module SharedComponents.FbLoginButton exposing (fbLoginButton)
import Html exposing (..)
import Html.Attributes exposing (..)


fbLoginButton : Html msg
fbLoginButton =
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