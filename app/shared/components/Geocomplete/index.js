import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import Autocomplete from '../Autocomplete';
import GeoAutocompleteItemShape from './GeoAutocompleteItemShape';

const propTypes = {
  isFetchingSuggestions: PropTypes.bool,
  suggestions: PropTypes.arrayOf(GeoAutocompleteItemShape),
  fetchSuggestions: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSelectSuggestion: PropTypes.func.isRequired,
};

const defaultProps = {
  suggestions: [],
  isFetchingSuggestions: false,
  onChange: () => null,
};

export default class Geocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(event) {
    this.props.onChange(_get(event, 'suggestion.description', ''));
    this.props.onSelectSuggestion(_get(event, 'suggestion.place_id', null));
  }

  render() {
    const { suggestions, fetchSuggestions, isFetchingSuggestions, ...rest } = this.props;

    return (
      <Autocomplete
        suggestions={suggestions}
        renderSuggestion={suggestion => suggestion.description}
        getSuggestionValue={suggestion => suggestion.description}
        fetchSuggestions={fetchSuggestions}
        onSelect={this.onSelect}
        inputProps={{
          ...rest,
        }}
      />
    );
  }
}

Geocomplete.propTypes = propTypes;
Geocomplete.defaultProps = defaultProps;
