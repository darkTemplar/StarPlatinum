module Routing exposing (..)

import Navigation exposing (Location)
import UrlParser exposing (..)

type Route = 
    NotFoundRoute
    | HomeRoute
    | LoginRoute
    | SignupRoute
    | ListingsRoute
    | CreateListingRoute String


matchers : Parser (Route -> a) a
matchers =
    oneOf
    [ map HomeRoute top
    , map LoginRoute (s "login")
    , map SignupRoute (s "signup")
    , map ListingsRoute (s "listings")
    , map CreateListingRoute (s "listing/new" </> string)
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

listingsUrl: String
listingsUrl = "/listings"

newListingUrl: String
newListingUrl = "/listing/new"




-- FIXME: right now the above urls only work if navigated to from home page, directly typing them in browser fails
