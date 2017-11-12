module Auth.Types exposing (..)

import Http exposing (..)


type alias Model =
    { email : String
    , password : String
    , error : Maybe String
    , isLogin: Bool
    }


type Msg
    = EmailInput String
    | PasswordInput String
    | Error String
    | SignupButtonClick
    | LoginButtonClick
    | FbButtonClick
    | GoogleButtonClick
    | LoginResponse (Result Http.Error String)
