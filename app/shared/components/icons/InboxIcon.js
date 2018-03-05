import React from 'react';
import PropTypes from 'prop-types';
import InboxIconSvg from '../../svgs/icn_inbox.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function InboxIcon({
  size,
  color,
}) {
  return <InboxIconSvg width={size} height={size} fill={color} />;
}

InboxIcon.propTypes = propTypes;
InboxIcon.defaultProps = defaultProps;
