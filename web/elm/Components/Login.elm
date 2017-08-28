module Login exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


-- model 
type alias Model = {
    modalTitle: String,
    email: String, 
    password: String, 
    error: Maybe String
}

initModel: Model
initModel = {
    modalTitle = "Sign Up",
    email = "",
    password = "",
    error = Nothing}

init: (Model, Cmd Msg)
init = 
    (initModel, Cmd.none)

-- update
type Msg = EmailInput String
    | PasswordInput String
    | Error String
    | Submit

update: Msg -> Model -> (Model, Cmd Msg)
update msg model = 
    case msg of 
        EmailInput email -> (
            {model | email = email}, Cmd.none)
        PasswordInput password -> 
            ({model | password = password}, Cmd.none)
        Error error -> 
            ({model | error = Just error}, Cmd.none)
        Submit -> 
            (model, Cmd.none)

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

loginForm: Html Msg
loginForm = 
    Html.form [] [
        div [class "form-row"] [
            div [class "form-group col-md-3"] [
                input [type_ "text", placeholder "First Name", class "form-control", id "firstName"] []
            ],
            div [class "form-group col-md-3"] [
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
            button [type_ "button", class "btn btn-primary"] [text "Submit"]
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
                        div [class "row"] [
                            fbLoginBtn
                        ],
                        div [class "row"] [
                            googleLoginBtn
                        ],
                        hr [] [],
                        loginForm
                    ]
                ],
                div [class "modal-footer"] [
                    span [] [text "Already have an account?"],
                    a [href "#"] [text "Log In"]
                ]
            ]
        ]
    ]















