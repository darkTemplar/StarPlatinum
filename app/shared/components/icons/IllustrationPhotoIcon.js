import React from 'react';
import PropTypes from 'prop-types';
import IllustrationPhotoIconSvg from '../../svgs/illus_photos.svg';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

const defaultProps = {
  size: 64,
  color: undefined,
};

export default function IllustrationPhotoIcon({
  size,
  color,
}) {
  return <IllustrationPhotoIconSvg width={size} height={size} fill={color} />;
}

IllustrationPhotoIcon.propTypes = propTypes;
IllustrationPhotoIcon.defaultProps = defaultProps;
