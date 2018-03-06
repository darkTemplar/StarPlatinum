import React from 'react';
import PropTypes from 'prop-types';
import Svg from '../../svgs/browseProperties.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function BrowsePropertiesIcon({
  size,
  color,
}) {
  return <Svg width={size} height={size} fill={color} />;
}

BrowsePropertiesIcon.propTypes = propTypes;
BrowsePropertiesIcon.defaultProps = defaultProps;
