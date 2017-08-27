port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

-- model
type alias Model =
    { page : Page
    }


type Page
    = NotFound


initModel : Model
initModel =
    { page = NotFound }


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )



-- update
type Msg
    = Navigate Page


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate page ->
            ( { model | page = page }, Cmd.none )



-- view
view : Model -> Html Msg
view model =
    let
        page =
            case model.page of
                NotFound ->
                    div [ class "main" ]
                        [ h1 []
                            [ text "Sorry the page you are looking for was not found!" ]
                        ]
    in
        div [class "container"]
            [ pageHeader model
            , page
            ]


pageHeader : Model -> Html Msg
pageHeader model =
    nav [class "navbar navbar-default navbar-fixed-top navbar-expand-sm justify-content-between"][
            div [class "navbar-header"] [
                a [href "#", class "navbar-brand"] [
                    img [src "", alt "Offerdate"][]
                ]
            ],
            div [class "navbar-collapse"] [
                div [class "nav navbar-nav mr-auto"] [
                    a [href "#", class "nav-item nav-link"] [text "Buy"],
                    a [href "#", class "nav-item nav-link"] [text "Sell"],
                    a [href "#", class "nav-item nav-link"] [text "Listings"]
                ],
                Html.form [class "form-inline"] [
                    button [type_ "submit", class "btn btn-default mr-sm-2"] [text "Login"],
                    button [type_ "submit", class "btn btn-primary"] [text "Signup"]
                ]
            ]
    ]



-- subscriptions
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }