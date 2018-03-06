import React from 'react';
import PropTypes from 'prop-types';
import MyOffersIconSvg from '../../svgs/myOffers.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function MyOffersIcon({
  size,
  color,
}) {
  return <MyOffersIconSvg width={size} height={size} fill={color} />;
}

MyOffersIcon.propTypes = propTypes;
MyOffersIcon.defaultProps = defaultProps;
