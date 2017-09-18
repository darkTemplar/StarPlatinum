module Routing exposing (..)

import Navigation exposing (Location)
import UrlParser exposing (..)

type Route = 
    NotFoundRoute
    | HomeRoute
    | LoginRoute
    | SignupRoute


matchers : Parser (Route -> a) a
matchers =
    oneOf
    [ map HomeRoute top
    , map LoginRoute (s "login")
    , map SignupRoute (s "signup")
    ]

parseLocation : Location -> Route
parseLocation location =
    case (parsePath matchers location) of
        Just route ->
            route
        Nothing ->
            NotFoundRoute


loginUrl: String
loginUrl = "/login"

signupUrl: String
signupUrl = "/signup"
