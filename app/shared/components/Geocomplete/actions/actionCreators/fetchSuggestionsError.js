import {
  FETCH_SUGGESTIONS_ERROR,
} from '../actionTypes';

export default function fetchSuggestionsError(errorMessage) {
  return {
    type: FETCH_SUGGESTIONS_ERROR,
    payload: {
      errorMessage,
    },
  };
}
