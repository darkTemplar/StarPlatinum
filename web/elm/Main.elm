port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Navigation
import Login

-- model

type alias Model = {
    page : Page,
    loginModel: Login.Model,
    token: Maybe String,
    loggedIn: Bool
    }


type Page = NotFound
    | HomePage
    | LoginPage


init : Flags -> Navigation.Location -> ( Model, Cmd Msg )
init flags location = 
    let
        page = 
            hashToPage location.hash

        (loginModel, loginCmd) = 
            Login.init

        initModel = {
            page = page,
            loginModel = loginModel,
            token = flags.token,
            loggedIn = flags.token /= Nothing
        }

        cmds = 
            Cmd.batch [
                Cmd.map LoginPageMsg loginCmd
            ]

    in

        (initModel, cmds)
        

-- update
type Msg
    = Navigate Page
    | ChangePage Page
    | LoginPageMsg Login.Msg
    | Logout


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Navigate page ->
            ( model, Navigation.newUrl <| pageToHash model.page)
        ChangePage page ->
            ( { model | page = page }, Cmd.none )
        LoginPageMsg msg -> 
            let
                (loginModel, loginCmd, token) = Login.update msg model.loginModel

                loggedIn = token /= Nothing

                saveTokenCmd =
                    case token of
                        Just jwt ->
                            saveToken jwt
                        Nothing ->
                            Cmd.none
            in
                ({model | loginModel = loginModel, 
                    token = Just token, 
                    loggedIn = loggedIn}, 
                    Cmd.batch [
                        Cmd.map LoginPageMsg loginCmd,
                        saveTokenCmd
                        ]
                    )
        Logout ->
            ({model| 
                token = Nothing,
                loggedIn = False},
            deleteToken ()
                )             
            



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
    case model.loggedIn of
        True -> 
            userHeader model
        False ->
            visitorHeader model


visitorHeader : Model -> Html Msg
visitorHeader model =
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

userHeader : Model -> Html Msg
userHeader model =
    nav [class "navbar navbar-default navbar-fixed-top navbar-expand-sm justify-content-between"][
            div [class "navbar-header"] [
                a [href "#", class "navbar-brand"] [
                    img [src "", alt "Offerdate"][]
                ]
            ],
            div [class "navbar-collapse"] [
                div [class "nav navbar-nav mr-auto"] [
                    a [href "#", class "nav-item nav-link"] [text "Listings"],
                    a [href "#", class "nav-item nav-link"] [text "Watching"],
                    a [href "#", class "nav-item nav-link"] [text "Notifcations"]
                ],
                Html.form [class "form-inline"] [
                -- replace with profile pic and context menu
                    button [type_ "submit", class "btn btn-default mr-sm-2"] [text "Log Out"],
                ]
            ]
    ]



-- subscriptions
subscriptions model =
    let
        loginSub =
            Login.subscriptions model.loginModel
    in
        Sub.batch [Sub.map LoginMsg loginSub]
                


-- utility functions

pageToHash: Page -> String
pageToHash page = case page of
    HomePage -> "#/"
    LoginPage -> "#/login"
    NotFound -> "#notFound"

hashToPage: String -> Page
hashToPage hash = case hash of
    "/#" -> HomePage
    "" -> HomePage
    "#/login" -> LoginPage
    _ -> NotFound

locationToMsg: Navigation.Location -> Msg
locationToMsg location = 
    location.hash
    |> hashToPage
    |> ChangePage    


-- main 

type alias Flags = {
    token: Maybe String
}

main : Program Flags Model Msg
main =
    Navigation.programWithFlags locationToMsg
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

port saveToken: String -> Cmd Msg

port deleteToken: () -> Cmd Msg