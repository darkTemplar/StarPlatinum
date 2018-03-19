import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../Autocomplete';
import GeoAutocompleteItemShape from './GeoAutocompleteItemShape';

const propTypes = {
  suggestions: PropTypes.arrayOf(GeoAutocompleteItemShape),
  // eslint-disable-next-line
  inputProps: PropTypes.object,
};

const defaultProps = {
  suggestions: [],
};

export default class Geocomplete extends React.PureComponent {
  render() {
    const { inputProps } = this.props;

    return (
      <Autocomplete
        suggestions={[
          { label: 'foo' },
          { label: 'bar' },
        ]}
        renderSuggestion={suggestion => (
          <div>
            {suggestion.label}
          </div>
        )}
        getSuggestionValue={suggestion => suggestion.label}
        fetchSuggestions={() => null}
        inputProps={inputProps}
      />
    );
  }
}

Geocomplete.propTypes = propTypes;
Geocomplete.defaultProps = defaultProps;
