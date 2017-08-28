port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Navigation
import Login

-- model
type alias 

type alias Model = {
    page : Page,
    loginModel: Maybe Login.Model
    }


type Page = NotFound
    | HomePage
    | LoginPage


init : Navigation.Location -> ( Model, Cmd Msg )
init location = let
    page = hashToPage location.hash
    (loginModel, loginCmd) = Login.init
    cmds = Cmd.batch [
        Cmd.map loginCmd
    ]
    in
    (loginModel, cmds)
        

-- update
type Msg
    = Navigate Page
    | ChangePage Page
    | LoginPageMsg Login.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate page ->
            ( model, newUrl <| pageToHash model.page)
        ChangePage page ->
            ( { model | page = page }, Cmd.none )
        LoginPageMsg msg -> 
            let
                (loginModel, loginCmd) = Login.update msg model.loginModel      
            in
                ({model | loginModel = loginModel}, Cmd.map LoginPageMsg loginCmd)
                    
            



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
                HomePage ->
                    div [ class "main" ]
                        [ h1 []
                            [ text "Welcome to Offerdate!" ]
                        ]        
                LoginPage -> 
                    Html.map LoginPageMsg (Login.view model.loginModel)
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


-- utility functions

pageToHash: Page -> String
pageToHash page = case page of
    HomePage -> "#/"
    LoginPage -> "#login"
    NotFound -> "#notFound"

hashToPage: String -> Page
hashToPage hash = case hash of
    "/#" -> HomePage
    "" -> HomePage
    "/#login" -> LoginPage
    _ -> NotFound

locationToMsg: Navigation.Location -> Msg
locationToMsg location = 
    location.hash
    |> hashToPage
    |> ChangePage    


-- main 
main : Program Never Model Msg
main =
    Navigation.program locationToMsg
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }