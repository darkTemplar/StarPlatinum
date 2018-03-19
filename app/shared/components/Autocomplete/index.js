/**
 * Provides a wrapper around react-autocomplete to provide some basic styling
 */
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import Input from '../Input';

const propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.any),
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  // eslint-disable-next-line
  inputProps: PropTypes.object,
};

const defaultProps = {
  suggestions: [],
  inputProps: {},
};

// see https://github.com/moroshko/react-autosuggest#onsuggestionsfetchrequested-required
const SUGGESTIONS_FETCH_REASON = {
  INPUT_CHANGED: 'input-changed',
};

export default class Autocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: '',
      suggestions: this.props.suggestions || [],
    };
  }

  componentWillReceiveProps({ suggestions }) {
    this.setState({ suggestions });
  }

  onChange(event, { newValue, method }) {
    this.setState({ value: newValue });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSuggestionsFetchRequested({ value, reason }) {
    if (reason === SUGGESTIONS_FETCH_REASON.INPUT_CHANGED) {
      this.props.fetchSuggestions(value);
    }
  }

  renderInputComponent(props) {
    const { inputProps } = this.props;

    return (
      <Input
        type="search"
        nativeOnChange
        {...inputProps}
        {..._omit(props, 'ref')}
        inputRef={props.ref || undefined}
      />
    );
  }

  render() {
    const { suggestions, value } = this.state;
    const { renderSuggestion, getSuggestionValue } = this.props;
    const inputProps = {
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        renderInputComponent={this.renderInputComponent}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;
