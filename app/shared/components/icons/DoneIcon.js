import React from 'react';
import PropTypes from 'prop-types';
import DoneIconSvg from '../../svgs/checkmark.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function DoneIcon({
  size,
  color,
}) {
  return <DoneIconSvg width={size} height={size} fill={color} />;
}

DoneIcon.propTypes = propTypes;
DoneIcon.defaultProps = defaultProps;
