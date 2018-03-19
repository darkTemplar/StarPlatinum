import { GEOCOMPLETE_ENDPOINT } from '../../constants';
import { post } from '../../../../utils/fetch';
import fetchSuggestionsError from './fetchSuggestionsError';
import fetchSuggestionsRequest from './fetchSuggestionsRequest';
import fetchSuggestionsSuccess from './fetchSuggestionsSuccess';

export default function fetchSuggestions(value) {
  return (dispatch) => {
    dispatch(fetchSuggestionsRequest());

    post(GEOCOMPLETE_ENDPOINT, {
      body: {
        value,
      },
    }).then(
      (response) => {
        dispatch(fetchSuggestionsSuccess(response.suggestions));
      },
      ex => dispatch(fetchSuggestionsError(ex.message)),
    ).catch(ex => dispatch(fetchSuggestionsError(ex.message)));
  };
}
