module Login exposing (..)
import Html exposing (text, Html, form, div, h3, input)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

-- model
type alias Model = {email: String, password: String}

initModel: Model
initModel = {email = "", password = ""}

-- update
type Msg = EmailInput String| PasswordInput String | Submit

update: Msg -> Model -> Model
update msg model = case msg of
    EmailInput email -> {model | email = email}
    PasswordInput password -> {model | password = password}
    Submit -> model -- submit form to server here

-- view
view: Model -> Html Msg
view model = div [] [
    h3 [] [text "Login"],
    Html.form [] [
        input [type_ "text", onInput EmailInput, placeholder "email"] [],
        input [type_ "password", onInput PasswordInput, placeholder "password"] [],
        input [type_ "Submit"] [text "Login"]
        ]
        ]



main : Program Never Model Msg
main =
    Html.beginnerProgram { model = initModel, update = update, view = view }