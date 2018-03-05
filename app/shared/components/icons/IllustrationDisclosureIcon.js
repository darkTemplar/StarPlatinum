import React from 'react';
import PropTypes from 'prop-types';
import IllustrationDisclosureIconSvg from '../../svgs/illus_disclosures.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function IllustrationDisclosureIcon({
  size,
  color,
}) {
  return <IllustrationDisclosureIconSvg width={size} height={size} fill={color} />;
}

IllustrationDisclosureIcon.propTypes = propTypes;
IllustrationDisclosureIcon.defaultProps = defaultProps;
