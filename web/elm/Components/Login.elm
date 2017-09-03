module Login exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Json.Encode as JE
import Json.Decode as JD exposing (field)
import Navigation


-- model 
type alias Model = {
    modalTitle: String,
    footerText: String,
    footerCta: String,
    email: String, 
    password: String,
    mainForm: Html Msg,
    error: Maybe String
}

initModel: Model
initModel = {
    modalTitle = "Sign Up",
    footerText = "Already have an account?",
    footerCta = "Log In",
    email = "",
    password = "",
    mainForm = signupForm,
    error = Nothing}

init: (Model, Cmd Msg)
init = 
    (initModel, Cmd.none)

-- update
type Msg = EmailInput String
    | PasswordInput String
    | Error String
    | Continue
    | LoginResponse (Result Http.Error String)

authUrl: String
authUrl = "localhost:4000/sessions"

updateModalText: Bool -> Model -> Model
updateModalText isLogin model = if isLogin
    then
        {model | modalTitle = "Log In", 
        footerText = "Need an account?", 
        footerCta = "Sign Up", 
        mainForm = loginForm}
    else
        model

update: Msg -> Model -> (Model, Cmd Msg, Maybe String)
update msg model = 
    case msg of 
        EmailInput email -> (
            {model | email = email}, Cmd.none, Nothing)
        PasswordInput password -> 
            ({model | password = password}, Cmd.none, Nothing)
        Error error -> 
            ({model | error = Just error}, Cmd.none, Nothing)
        Continue -> 
            let
                body = JE.object 
                    [("email", JE.string model.email), ("password", JE.string model.password)]
                    |> JE.encode 4
                    |> Http.stringBody "application/json"

                decoder = 
                    field "token" JD.string

                request = 
                    Http.post authUrl body decoder

                cmd = 
                    Http.send LoginResponse request  
                    
            in
                    
            (model, cmd, Nothing)
        LoginResponse (Ok token) -> 
            (initModel, Navigation.newUrl "#/", Just token)

        LoginResponse (Err err) ->
            let
                errMsg = case err of
                    Http.BadStatus resp -> 
                        case resp.status.code of
                            401 -> 
                                resp.body
                            _ -> 
                                resp.status.message
                    _ ->
                        "Authentication Error" 
                    
            in

                ({model| error = Just errMsg}, Cmd.none, Nothing)

-- view 

fbLoginBtn: Html Msg
fbLoginBtn = 
    div [
        class "fb-login-button", 
        attribute "data-max-rows" "1", 
        attribute "data-size" "large", 
        attribute "data-button-type" "continue_with",
        attribute "data-show-faces" "false",
        attribute "data-auto-logout-link" "false",
        attribute "data-use-continue-as" "true"] []

googleLoginBtn: Html Msg
googleLoginBtn = 
    a[] [text "Continue with Google"]

signupForm: Html Msg
signupForm = 
    Html.form [] [
        div [class "form-row"] [
            div [class "form-group col-md-6"] [
                input [type_ "text", placeholder "First Name", class "form-control", id "firstName"] []
            ],
            div [class "form-group col-md-6"] [
                input [type_ "text", placeholder "Last Name", class "form-control", id "lastName"] []
            ]
        ],
        div [class "form-group"] [
                input [type_ "text", placeholder "Email", class "form-control", id "email"] []
            ],
        div [class "form-group"] [
                input [type_ "password", placeholder "Password", class "form-control", id "password"] []
            ],
        div [class "form-group"] [
            button [type_ "button", class "btn btn-primary btn-block"] [text "Continue"]
        ]
        
    ]

loginForm: Html Msg
loginForm = 
    Html.form [] [
        div [class "form-group"] [
                input [type_ "text", placeholder "Email", class "form-control", id "email"] []
            ],
        div [class "form-group"] [
                input [type_ "password", placeholder "Password", class "form-control", id "password"] []
            ],
        div [class "form-group"] [
            button [type_ "button", class "btn btn-primary btn-block"] [text "Continue"]
        ]
        
    ]

view: Model -> Html Msg
view model = 
    div [class "modal-fade"][
        div [class "modal-dialog"] [
            div [class "modal-content"] [
                div [class "modal-header"] [
                    h5 [class "modal-title"] [text model.modalTitle]
                ],
                div [class "modal-body"] [
                    div [class "container-fluid"] [
                        errorPanel model.error,
                        div [class "row"] [
                            fbLoginBtn
                        ],
                        div [class "row"] [
                            googleLoginBtn
                        ],
                        hr [] [],
                        model.mainForm
                    ]
                ],
                div [class "modal-footer"] [
                    div [class "footer-content"] [
                        span [class "footer-text"] [text model.footerText],
                        a [href "#"] [text model.footerCta]
                    ]
                ]
            ]
        ]
    ]

errorPanel: Maybe String -> Html Msg
errorPanel err = 
    case err of
        Just errMsg -> 
            div [class "error"] [text errMsg] 
        Nothing -> 
            text ""

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none















