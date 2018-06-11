import {
  BOOTSTRAP_CURRENT_USER,
  SWITCH_SIGNUP_LOGIN,
  HIDE_SIGNUP_LOGIN,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SHOW_SIGNUP_LOGIN,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../actions/actionTypes';
import { MODES } from '../../components/SignupLogin/constants';

function getInitialState() {
  return {
    currentUser: null,
    // signing up or logging in
    isLoading: false,
    error: '',
    // modal visible
    isVisible: false,
    mode: MODES.SIGNUP,
  };
}

export default function authReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case BOOTSTRAP_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload.user,
      };
    }
    case SWITCH_SIGNUP_LOGIN: {
      return {
        ...state,
        mode: state.mode === MODES.SIGNUP ? MODES.LOGIN : MODES.SIGNUP,
      };
    }
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST: {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.user,
      };
    }
    case LOGIN_ERROR:
    case SIGNUP_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    case SHOW_SIGNUP_LOGIN: {
      return {
        ...state,
        isVisible: true,
      };
    }
    case HIDE_SIGNUP_LOGIN: {
      return {
        ...state,
        isVisible: false,
      };
    }
    default: {
      return state;
    }
  }
}
