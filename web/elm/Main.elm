port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Navigation
import Routing exposing (..)
import Utils exposing (onLinkClick)


-- model


type alias Model =
    { token : Maybe String
    , loggedIn : Bool
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        initModel =
            { token = flags.token
            , loggedIn = flags.token /= Nothing
            }
    in
        ( initModel, Cmd.none )



-- update


type Msg
    = ChangeLocation String
    | Logout


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeLocation url ->
            ( model, Navigation.load url )

        Logout ->
            ( { model
                | token = Nothing
                , loggedIn = False
              }
            , deleteToken ()
            )



-- view


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ pageHeader model
        , homeView
        ]


homeView : Html Msg
homeView =
    div [ class "main" ]
        [ h1 []
            [ text "Welcome to Offerdate!" ]
        ]


pageHeader : Model -> Html Msg
pageHeader model =
    case model.loggedIn of
        True ->
            userHeader model

        False ->
            visitorHeader model


visitorHeader : Model -> Html Msg
visitorHeader model =
    nav [ class "navbar navbar-default navbar-fixed-top navbar-expand-sm justify-content-between" ]
        [ div [ class "navbar-header" ]
            [ a [ href "#", class "navbar-brand" ]
                [ img [ src "", alt "Offerdate" ] []
                ]
            ]
        , div [ class "navbar-collapse" ]
            [ div [ class "nav navbar-nav mr-auto" ]
                [ a [ href "#", class "nav-item nav-link" ] [ text "Buy" ]
                , a [ href "#", class "nav-item nav-link" ] [ text "Sell" ]
                , a [ href listingsUrl, class "nav-item nav-link" ] [ text "Listings" ]
                ]
            , Html.form [ class "form-inline" ]
                [ button [ type_ "submit", class "btn btn-default mr-sm-2", onLinkClick (ChangeLocation loginUrl) ] [ text "Login" ]
                , button [ type_ "submit", class "btn btn-primary", onLinkClick (ChangeLocation signupUrl) ] [ text "Signup" ]
                ]
            ]
        ]


userHeader : Model -> Html Msg
userHeader model =
    nav [ class "navbar navbar-default navbar-fixed-top navbar-expand-sm justify-content-between" ]
        [ div [ class "navbar-header" ]
            [ a [ href "#", class "navbar-brand" ]
                [ img [ src "", alt "Offerdate" ] []
                ]
            ]
        , div [ class "navbar-collapse" ]
            [ div [ class "nav navbar-nav mr-auto" ]
                [ a [ href "#", class "nav-item nav-link" ] [ text "Listings" ]
                , a [ href "#", class "nav-item nav-link" ] [ text "Watching" ]
                , a [ href "#", class "nav-item nav-link" ] [ text "Notifcations" ]
                ]
            , Html.form [ class "form-inline" ]
                [ -- replace with profile pic and context menu
                  button [ type_ "submit", class "btn btn-default mr-sm-2" ] [ text "Log Out" ]
                ]
            ]
        ]



-- subscriptions


subscriptions model =
    Sub.none



-- main


type alias Flags =
    { token : Maybe String
    }


main : Program Flags Model Msg
main =
    programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


port saveToken : String -> Cmd msg


port deleteToken : () -> Cmd msg
