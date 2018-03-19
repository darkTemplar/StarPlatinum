import React from 'react';
import PropTypes from 'prop-types';
import CreateOfferIconSvg from '../../svgs/create_offer.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function CreateOfferIcon({
  size,
  color,
}) {
  return <CreateOfferIconSvg width={size} height={size} fill={color} />;
}

CreateOfferIcon.propTypes = propTypes;
CreateOfferIcon.defaultProps = defaultProps;
