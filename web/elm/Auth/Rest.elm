module Auth.Rest exposing (..)

import Auth.Types exposing (..)

import Json.Encode as JE
import Json.Decode as JD exposing (field)
import Http exposing (..)

authUrl: String
authUrl = "localhost:4000/sessions"

tokenDecoder = 
    field "token" JD.string

requestBody: Model -> Http.Body
requestBody model = JE.object 
                    [("email", JE.string model.email), ("password", JE.string model.password)]
                    |> JE.encode 4
                    |> Http.stringBody "application/json"

postRequest: Model -> Http.Request String 
postRequest model = let
        body = requestBody model

        decoder = tokenDecoder
    in
        Http.post authUrl body decoder
        

postCmd: (Result Http.Error String -> Msg) -> Model -> Cmd Msg
postCmd msg model = let
        request = postRequest model  
    in
        Http.send msg request
        


