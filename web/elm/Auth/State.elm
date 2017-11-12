module Auth.State exposing (subscriptions, update, init)
import Auth.Types exposing (..)
import Auth.Rest exposing (postCmd)
import Navigation
import Http


-- model


initModel : Model
initModel =
    { email = ""
    , password = ""
    , error = Nothing
    , isLogin = False
    }


init : ( Model, Cmd Msg )
init =
    ( initModel, Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


-- update


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
                    postCmd LoginResponse model
            in
                ( model, cmd )
        SignupButtonClick ->
            let
                cmd =
                    postCmd LoginResponse model
            in
                ( model, cmd )
        FbButtonClick ->
            let
                cmd =
                    postCmd LoginResponse model
            in
                ( model, cmd )

        GoogleButtonClick ->
            let
                cmd =
                    postCmd LoginResponse model
            in
                ( model, cmd )

        LoginResponse (Ok token) ->
            ( initModel, Navigation.newUrl "#/" )

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

