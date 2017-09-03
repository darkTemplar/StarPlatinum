module Auth.Types exposing (..)
import Http exposing (..)


type alias Model = {
    email: String, 
    password: String,
    error: Maybe String
}

type Msg = EmailInput String
    | PasswordInput String
    | Error String
    | Continue
    | LoginResponse (Result Http.Error String)