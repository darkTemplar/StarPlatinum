import React from 'react';
import PropTypes from 'prop-types';
import Svg from '../../svgs/close.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function CloseIcon({
  size,
  color,
}) {
  return <Svg width={size} height={size} fill={color} />;
}

CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;
