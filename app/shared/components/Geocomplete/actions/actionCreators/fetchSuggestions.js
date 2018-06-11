import _get from 'lodash/get';
import { GEOCOMPLETE_ENDPOINT } from '../../constants';
import { get } from '../../../../utils/fetch';
import fetchSuggestionsError from './fetchSuggestionsError';
import fetchSuggestionsRequest from './fetchSuggestionsRequest';
import fetchSuggestionsSuccess from './fetchSuggestionsSuccess';

export default function fetchSuggestions(value) {
  return (dispatch) => {
    dispatch(fetchSuggestionsRequest());

    return get(GEOCOMPLETE_ENDPOINT, {
      query: {
        query: value,
      },
    }).then(
      (response) => {
        dispatch(fetchSuggestionsSuccess(_get(response, 'suggestions.predictions', [])));
      },
      ex => dispatch(fetchSuggestionsError(ex.message)),
    ).catch(ex => dispatch(fetchSuggestionsError(ex.message)));
  };
}
