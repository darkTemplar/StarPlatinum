import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../Autocomplete';
import GeoAutocompleteItemShape from './GeoAutocompleteItemShape';

const propTypes = {
  suggestions: PropTypes.arrayOf(GeoAutocompleteItemShape),
  fetchSuggestions: PropTypes.func.isRequired,
  // eslint-disable-next-line
  inputProps: PropTypes.object,
};

const defaultProps = {
  suggestions: [],
};

export default class Geocomplete extends React.PureComponent {
  render() {
    const { inputProps, suggestions, fetchSuggestions } = this.props;

    return (
      <Autocomplete
        suggestions={suggestions}
        renderSuggestion={suggestion => suggestion.description}
        getSuggestionValue={suggestion => suggestion.description}
        fetchSuggestions={fetchSuggestions}
        inputProps={inputProps}
      />
    );
  }
}

Geocomplete.propTypes = propTypes;
Geocomplete.defaultProps = defaultProps;
