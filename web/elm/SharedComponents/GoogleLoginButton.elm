module SharedComponents.GoogleLoginButton exposing (googleLoginButton)
import Html exposing (..)
import Html.Attributes exposing (..)


googleLoginButton : Html msg
googleLoginButton =
    a [] [ text "Continue with Google" ]