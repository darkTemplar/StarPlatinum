module Utils exposing (..)

import String exposing (toInt, toFloat)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onWithOptions)
import Json.Decode as Decode

stringToInt: String -> Int
stringToInt str =
    str 
    |> toInt
    |> Result.withDefault 0

stringToFloat: String -> Float
stringToFloat str = 
    str
    |> String.toFloat
    |> Result.withDefault 0.0

onLinkClick: msg -> Attribute msg
onLinkClick message = 
    let 
        options = {
            stopPropagation = False,
            preventDefault = True
    }
    in
        onWithOptions "click" options (Decode.succeed message)

notFoundView: Html msg
notFoundView = 
    div [ class "main" ]
        [ h1 []
            [ text "Sorry the page you are looking for was not found!" ]
        ]
