import React from 'react';
import PropTypes from 'prop-types';
import MyListingIconSvg from '../../svgs/myListings.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function MyListingIcon({
  size,
  color,
}) {
  return <MyListingIconSvg width={size} height={size} fill={color} />;
}

MyListingIcon.propTypes = propTypes;
MyListingIcon.defaultProps = defaultProps;
