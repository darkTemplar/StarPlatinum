/**
 * Provides a wrapper around react-autocomplete to provide some basic styling
 */
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import Input from '../Input';

const propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.any),
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  // eslint-disable-next-line
  inputProps: PropTypes.object,
  alwaysRenderSuggestions: PropTypes.bool,
  onSelect: PropTypes.func,
  ...withStylesPropTypes,
};

const defaultProps = {
  suggestions: [],
  alwaysRenderSuggestions: false,
  onSelect: () => null,
  inputProps: {},
};

// see https://github.com/moroshko/react-autosuggest#onsuggestionsfetchrequested-required
const SUGGESTIONS_FETCH_REASON = {
  INPUT_CHANGED: 'input-changed',
};

export class UnstyledAutocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
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

    const { inputProps } = this.props;
    if (inputProps.onChange) {
      inputProps.onChange(newValue);
    }
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSuggestionsFetchRequested({ value, reason }) {
    if (reason === SUGGESTIONS_FETCH_REASON.INPUT_CHANGED) {
      this.props.fetchSuggestions(value);
    }
  }

  onSuggestionSelected(_, suggestion) {
    this.props.onSelect(suggestion);
  }

  renderInputComponent(props) {
    return (
      <Input
        type="search"
        nativeOnChange
        {..._omit(props, 'ref')}
        inputRef={props.ref || undefined}
      />
    );
  }

  renderSuggestionsContainer({ containerProps, children }) {
  }

  render() {
    const { suggestions, value } = this.state;
    const {
      renderSuggestion,
      getSuggestionValue,
      alwaysRenderSuggestions,
      styles,
      inputProps: otherInputProps,
    } = this.props;
    const inputProps = {
      value,
      onChange: this.onChange,
      ...otherInputProps,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        renderInputComponent={this.renderInputComponent}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions={alwaysRenderSuggestions}
        highlightFirstSuggestion
        theme={{
          suggestionsContainer: css(styles.suggestionsContainer).className,
          suggestionsList: css(styles.suggestionsList).className,
          suggestion: css(styles.suggestion).className,
        }}
      />
    );
  }
}

UnstyledAutocomplete.propTypes = propTypes;
UnstyledAutocomplete.defaultProps = defaultProps;

export default withStyles(({ unit, color }) => ({
  suggestionsContainer: {
    position: 'relative',
    width: '100%',
  },

  suggestionsList: {
    position: 'absolute',
    zIndex: 1,
    background: color.greys.white,
    width: '100%',
    margin: 0,
    padding: 0,
    borderLeft: `1px solid ${color.border}`,
    borderRight: `1px solid ${color.border}`,
  },

  suggestion: {
    listStyle: 'none',
    padding: unit,
    borderTop: `1px solid ${color.border}`,

    ':last-child': {
      borderBottom: `1px solid ${color.border}`,
    },
  },
}))(UnstyledAutocomplete);
