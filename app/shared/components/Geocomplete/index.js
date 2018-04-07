import _get from 'lodash/get';
import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../Autocomplete';
import GeoAutocompleteItemShape from './GeoAutocompleteItemShape';

const propTypes = {
  suggestions: PropTypes.arrayOf(GeoAutocompleteItemShape),
  fetchSuggestions: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  suggestions: [],
  onChange: () => null,
};

export default class Geocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(suggestion) {
    const { onChange } = this.props;
    onChange(_get(suggestion, 'suggestion.place_id', ''));
  }

  render() {
    const { suggestions, fetchSuggestions, ...rest } = this.props;

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
