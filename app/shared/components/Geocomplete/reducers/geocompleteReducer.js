/**
 * Must inject this reducer under key 'geocomplete'
 */

import {
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_ERROR,
} from '../actions/actionTypes';

const initalState = {
  suggestions: [],
  isFetchingSuggestions: false,
  errorMessage: '',
};

export default function geocompleteReducer(state = initalState, action = {}) {
  switch (action.type) {
    case FETCH_SUGGESTIONS_REQUEST: {
      return {
        ...state,
        errorMessage: '',
        isFetchingSuggestions: true,
      };
    }
    case FETCH_SUGGESTIONS_SUCCESS: {
      return {
        ...state,
        isFetchingSuggestions: false,
        suggestions: action.payload.suggestions,
      };
    }
    case FETCH_SUGGESTIONS_ERROR: {
      return {
        ...state,
        isFetchingSuggestions: false,
        errorMessage: action.payload.errorMessage,
      };
    }
    default: {
      return state;
    }
  }
}
