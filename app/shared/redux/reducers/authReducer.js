import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  BOOTSTRAP_CURRENT_USER,
} from '../actions/actionTypes';

function getInitialState() {
  return {
    currentUser: null,
    // signing up or logging in
    isLoading: false,
    error: '',
  };
}

export default function authReducer(state = getInitialState, action = {}) {
  switch (action.type) {
    case BOOTSTRAP_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload.user,
      };
    }
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SIGN_IN_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
