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
                            div [
                            class "fb-login-button", 
                            attribute "data-max-rows" "1", 
                            attribute "data-size" "large", 
                            attribute "data-button-type" "continue_with",
                            attribute "data-show-faces" "false",
                            attribute "data-auto-logout-link" "false",
                            attribute "data-use-continue-as" "true"] []
                        ],
                        div [class "row"] [
                            a[] [text "Continue with Google"]
                        ]
                    ]
                ],
                div [class "modal-footer"] [
                    span [] [text "Already have an account?"],
                    a [href "#"] [text "Log In"]
                ]
            ]
        ]
    ]















