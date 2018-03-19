import { connect } from 'react-redux';

import Geocomplete from '../';
import fetchSuggestions from '../actions/actionCreators/fetchSuggestions';

export default connect(state => ({
  isFetchingSuggestions: state.geocomplete.isFetchingSuggestions,
  suggestions: state.geocomplete.suggestions,
}), { fetchSuggestions })(Geocomplete);
