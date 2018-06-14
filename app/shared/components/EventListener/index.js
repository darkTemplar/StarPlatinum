import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

// todo add passive, other event names
const propTypes = forbidExtraProps({
  target: PropTypes.oneOf(['window', 'document']).isRequired,
  eventName: PropTypes.oneOf(['keydown', 'keyup', 'scroll']).isRequired,
  callback: PropTypes.func.isRequired,
});

export default class EventListener extends React.Component {
  componentDidMount() {
    const { target, eventName, callback } = this.props;
    global.window[target].addEventListener(eventName, callback);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const { target, eventName, callback } = this.props;
    global.window[target].removeEventListener(eventName, callback);
  }

  render() {
    return null;
  }
}

EventListener.propTypes = propTypes;
