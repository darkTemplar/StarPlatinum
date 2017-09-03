module Auth.State exposing (init, update, subscriptions)

import Http exposing (..)
import Navigation
import Auth.Types exposing (..)
import Auth.Rest exposing (..)


initModel: Model
initModel = {
    email = "",
    password = "",
    error = Nothing}

init: (Model, Cmd Msg)
init = 
    (initModel, Cmd.none)


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
                cmd = 
                    postCmd LoginResponse model 
                    
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


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none