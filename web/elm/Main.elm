port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Navigation exposing (Location, newUrl)

import Routing exposing (..)
import Utils exposing (onLinkClick)
import Auth.Types
import Auth.State
import Auth.View

-- model

type alias Model = {
    route : Route,
    loginModel: Auth.Types.Model,
    token: Maybe String,
    loggedIn: Bool
    }


init : Flags -> Navigation.Location -> ( Model, Cmd Msg )
init flags location = 
    let
        route = 
            parseLocation location

        (loginModel, loginCmd) = 
            Auth.State.init

        initModel = {
            route = route,
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
type Msg =
    OnLocationChange Location
    | ChangeLocation String
    | LoginPageMsg Auth.Types.Msg
    | Logout



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeLocation url ->
            (model, newUrl url)
        OnLocationChange location ->
            ({model | route = parseLocation location}, Cmd.none)
        LoginPageMsg msg -> 
            let
                (loginModel, loginCmd, token) = Auth.State.update msg model.loginModel

                loggedIn = token /= Nothing

                saveTokenCmd =
                    case token of
                        Just jwt ->
                            saveToken jwt
                        Nothing ->
                            Cmd.none
            in
                ({model | loginModel = loginModel, 
                    token = token, 
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

page: Model -> Html Msg
page model =
    case model.route of
        NotFoundRoute ->
            notFoundView
        HomeRoute ->
            homeView
        LoginRoute -> 
            Html.map LoginPageMsg (Auth.View.root True model.loginModel)
        SignupRoute ->
            Html.map LoginPageMsg (Auth.View.root False model.loginModel)

view : Model -> Html Msg
view model =
    let
        newPage =
            page model            
    in
        div [class "container"]
            [ pageHeader model
            , newPage
            ]

notFoundView: Html Msg
notFoundView = 
    div [ class "main" ]
        [ h1 []
            [ text "Sorry the page you are looking for was not found!" ]
        ]

homeView: Html Msg
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
                    button [type_ "submit", class "btn btn-default mr-sm-2", onLinkClick (ChangeLocation loginUrl)] [text "Login"],
                    button [type_ "submit", class "btn btn-primary", onLinkClick (ChangeLocation signupUrl)] [text "Signup"]
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
                    button [type_ "submit", class "btn btn-default mr-sm-2"] [text "Log Out"]
                ]
            ]
        ]



-- subscriptions
subscriptions model =
    let
        loginSub =
            Auth.State.subscriptions model.loginModel
    in
        Sub.batch [Sub.map LoginPageMsg loginSub]
                 


-- main 

type alias Flags = {
    token: Maybe String
}

main : Program Flags Model Msg
main =
    Navigation.programWithFlags OnLocationChange
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

port saveToken: String -> Cmd msg

port deleteToken: () -> Cmd msg