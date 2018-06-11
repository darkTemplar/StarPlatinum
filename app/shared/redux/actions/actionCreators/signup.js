import { SIGNUP_ENDPOINT } from '../../../constants/api/auth';
import { SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS } from '../actionTypes';
import { post } from '../../../utils/fetch';
import hideSignupLogin from './hideSignupLogin';

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: {
      error,
    },
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user,
    },
  };
}

export default function signup({
  email,
  password,
}) {
  if (!email || !password) {
    throw new Error('Must not be missing fields required for sign up ');
  }

  return (dispatch) => {
    dispatch(signupRequest());

    return (
      post(SIGNUP_ENDPOINT, {
        body: {
          user: {
            email,
            password,
            first_name: 'foobar',
          },
        },
      })
        .then(
          (response) => {
            dispatch(signupSuccess(response.user));
            dispatch(hideSignupLogin());
          },
          (ex) => {
            dispatch(signupError(ex.errors));
          },
        )
    );
  };
}
