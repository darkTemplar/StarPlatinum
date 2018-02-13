import React from 'react';
import PropTypes from 'prop-types';
import IllustrationDisclosureIconSvg from '../../svgs/illus_disclosures.svg';

const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 64,
};

export default function IllustrationDisclosureIcon({
  size,
}) {
  return <IllustrationDisclosureIconSvg width={size} height={size} />;
}

IllustrationDisclosureIcon.propTypes = propTypes;
IllustrationDisclosureIcon.defaultProps = defaultProps;
