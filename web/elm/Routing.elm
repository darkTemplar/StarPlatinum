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

-- we can parsePath if we don't want to route with hash
parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route
        Nothing ->
            NotFoundRoute