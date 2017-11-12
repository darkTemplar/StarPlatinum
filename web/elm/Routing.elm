module Routing exposing (..)

import UrlParser exposing (..)


type Route
    = NotFoundRoute
    | HomeRoute
    | LoginRoute
    | SignupRoute
    | ListingsRoute
    | ListingRoute String String


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map HomeRoute top
        , map LoginRoute (s "login")
        , map SignupRoute (s "signup")
        , map ListingsRoute (s "listings")
        , map ListingRoute (s "listing" </> string </> string)
        ]


loginUrl : String
loginUrl =
    "/sessions/new"


signupUrl : String
signupUrl =
    "/users/new"


listingsUrl : String
listingsUrl =
    "/listings"


newListingUrl : String
newListingUrl =
    "/listing/new"



-- FIXME: right now the above urls only work if navigated to from home page, directly typing them in browser fails
