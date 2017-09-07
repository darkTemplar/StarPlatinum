port module CreateListingMain exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- model




init : Flags -> Navigation.Location -> ( Model, Cmd Msg )
init flags location = 
    let
        page = 
            hashToPage location.hash

        (loginModel, loginCmd) = 
            Auth.State.init

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
                    Html.map LoginPageMsg (Auth.View.root True model.loginModel)

                SignupPage -> 
                    Html.map LoginPageMsg (Auth.View.root False model.loginModel)
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
                    button [type_ "submit", class "btn btn-default mr-sm-2"] [text "Log Out"]
                ]
            ]
        ]

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

port saveToken: String -> Cmd msg

port deleteToken: () -> Cmd msg