import {
  FETCH_SUGGESTIONS_SUCCESS,
} from '../actionTypes';

export default function fetchSuggestionsSuccess(suggestions) {
  return {
    type: FETCH_SUGGESTIONS_SUCCESS,
    payload: {
      suggestions,
    },
  };
}
