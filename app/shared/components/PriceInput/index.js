import PropTypes from 'prop-types';
import React from 'react';

import Input from '../Input';
import formatCurrency from '../../utils/formatters/formatCurrency';
import parseIntFromCurrency from '../../utils/parsers/parseIntFromCurrency';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

const defaultProps = {
  value: '',
};

export default class PriceInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: parseIntFromCurrency(this.props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: parseIntFromCurrency(nextProps.value) });
    }
  }

  render() {
    return (
      <Input
        type="text"
        {...this.props}
        value={this.state.value ? formatCurrency(this.state.value, {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
          maximumSignificantDigits: 21,
        }) : ''}
      />
    );
  }
}

PriceInput.propTypes = propTypes;
PriceInput.defaultProps = defaultProps;
