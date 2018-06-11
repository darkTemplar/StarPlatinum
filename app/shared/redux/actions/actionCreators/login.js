import { LOGIN_ENDPOINT } from '../../../constants/api/auth';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionTypes';
import { post } from '../../../utils/fetch';
import hideSignupLogin from './hideSignupLogin';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: {
      error,
    },
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
}

export default function login({
  email,
  password,
}) {
  if (!email || !password) {
    throw new Error('Must not be missing fields required for sign up ');
  }

  return (dispatch) => {
    dispatch(loginRequest());

    return (
      post(LOGIN_ENDPOINT, {
        body: {
          session: {
            email,
            password,
          },
        },
      })
        .then(
          (response) => {
            dispatch(loginSuccess(response.user));
            dispatch(hideSignupLogin());
          },
          (ex) => {
            dispatch(loginError(ex.errors));
          },
        )
    );
  };
}
