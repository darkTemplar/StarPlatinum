module SharedComponents.ErrorPanel exposing (errorPanel)
import Html exposing (..)
import Html.Attributes exposing (..)


errorPanel : Maybe String -> Html msg
errorPanel err =
    case err of
        Just errMsg ->
            div [ class "error" ] [ text errMsg ]

        Nothing ->
            text ""