import React from 'react';
import PropTypes from 'prop-types';
import ReactDateTime from 'react-datetime';
import moment from 'moment';

import Input from '../Input';
import OutsideClickHandler from '../OutsideClickHandler';
import './datetime.css';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'h:mm:ss a';

const propTypes = {
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: () => null,
};

export default class DateTime extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  onFocus() {
    this.setState({ isOpen: true });
  }

  onOutsideClick() {
    this.setState({ isOpen: false });
  }

  onChange(value) {
    this.props.onChange(value);
  }

  renderInput(props) {
    return (
      <Input
        type="text"
        {...this.props}
        {...props}
        onChange={this.onChange}
        onFocus={this.onFocus}
      />
    );
  }

  render() {
    const { isOpen } = this.state;

    return (
      <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
        <ReactDateTime
          open={isOpen}
          dateFormat={DATE_FORMAT}
          timeFormat={TIME_FORMAT}
          renderInput={this.renderInput}
        />
      </OutsideClickHandler>
    );
  }
}

DateTime.propTypes = propTypes;
DateTime.defaultProps = defaultProps;
