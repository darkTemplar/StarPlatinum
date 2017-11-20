port module Login exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Http exposing (..)
import Navigation
import Json.Encode as JE
import Json.Decode as JD exposing (field, Decoder)

import Routing exposing (getPageUrl, login, home)
import SharedComponents.GoogleLoginButton exposing (googleLoginButton)
import SharedComponents.FbLoginButton exposing (fbLoginButton)
import SharedComponents.ErrorPanel exposing (errorPanel)



type alias Model =
    { email : String
    , password : String
    , error : Maybe String
    , isLogin: Bool
    }


initModel : Model
initModel =
    { email = ""
    , password = ""
    , error = Nothing
    , isLogin = False
    }


init : Flags -> ( Model, Cmd Msg )
init flags = 
    let
        model = initModel
        cmd =
            case flags.token of 
                Just jwt ->
                    Navigation.newUrl Routing.home
                Nothing ->
                    Cmd.none
        
    in
        
        ( model, cmd )



-- update

type Msg
    = EmailInput String
    | PasswordInput String
    | Error String
    | LoginButtonClick
    | FbButtonClick
    | GoogleButtonClick
    | LoginResponse (Result Http.Error String)



tokenDecoder: Decoder String
tokenDecoder = 
    field "token" JD.string

requestBody: Model -> Http.Body
requestBody model = JE.object 
                    [("email", JE.string model.email), ("password", JE.string model.password)]
                    |> JE.encode 4
                    |> Http.stringBody "application/json"

postRequest: Model -> Decoder String -> Http.Request String 
postRequest model decoder = let
        body = requestBody model
        authUrl = getPageUrl login
    in
        Http.post authUrl body decoder
        

authenticate: (Result Http.Error String -> Msg) -> Model -> Cmd Msg
authenticate msg model = let
        request = postRequest model tokenDecoder 
    in
        Http.send msg request


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EmailInput email ->
            ( { model | email = email }
            , Cmd.none
            )

        PasswordInput password ->
            ( { model | password = password }, Cmd.none )

        Error error ->
            ( { model | error = Just error }, Cmd.none )

        LoginButtonClick ->
            let
                cmd =
                    authenticate LoginResponse model
            in
                ( model, cmd )
        FbButtonClick ->
            let
                cmd =
                    authenticate LoginResponse model
            in
                ( model, cmd )

        GoogleButtonClick ->
            let
                cmd =
                    authenticate LoginResponse model
            in
                ( model, cmd )

        LoginResponse (Ok token) ->
            let
               saveTokenCmd  = saveLoginToken token
                    
            in
                
                ( initModel, Cmd.batch[saveTokenCmd, Navigation.newUrl Routing.home] )

        LoginResponse (Err err) ->
            let
                errMsg =
                    case err of
                        Http.BadStatus resp ->
                            case resp.status.code of
                                401 ->
                                    resp.body

                                _ ->
                                    resp.status.message

                        _ ->
                            "Authentication Error"
            in
                ( { model | error = Just errMsg }, Cmd.none )

-- view


loginForm : Html Msg
loginForm =
    Html.form []
        [ div [ class "form-group" ]
            [ input [ type_ "text", placeholder "Email", class "form-control", id "email" ] []
            ]
        , div [ class "form-group" ]
            [ input [ type_ "password", placeholder "Password", class "form-control", id "password" ] []
            ]
        , div [ class "form-group" ]
            [ button [ type_ "button", class "btn btn-primary btn-block" ] [ text "Continue" ]
            ]
        ]

view : Model -> Html Msg
view model =
    let
        ( title, footerText, footerCta, mainForm ) =
            ( "Sign Up", "Already have an account?", "Log In", loginForm )
    in
        div [ class "modal-fade" ]
            [ div [ class "modal-dialog" ]
                [ div [ class "modal-content" ]
                    [ div [ class "modal-header" ]
                        [ h5 [ class "modal-title" ] [ text title ]
                        ]
                    , div [ class "modal-body" ]
                        [ div [ class "container-fluid" ]
                            [ errorPanel model.error
                            , div [ class "row" ]
                                [ fbLoginButton
                                ]
                            , div [ class "row" ]
                                [ googleLoginButton
                                ]
                            , hr [] []
                            , mainForm
                            ]
                        ]
                    , div [ class "modal-footer" ]
                        [ div [ class "footer-content" ]
                            [ span [ class "footer-text" ] [ text footerText ]
                            , a [ href "#" ] [ text footerCta ]
                            ]
                        ]
                    ]
                ]
            ]



-- subscriptions


subscriptions model =
    Sub.none



type alias Flags =
    { token : Maybe String
    }
-- main


main =
    programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

port saveLoginToken : String -> Cmd msg