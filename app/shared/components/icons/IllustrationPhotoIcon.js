import React from 'react';
import PropTypes from 'prop-types';
import IllustrationPhotoIconSvg from '../../svgs/illus_photos.svg';

const propTypes = {
  size: PropTypes.number,
};

const defaultProps = {
  size: 64,
};

export default function IllustrationPhotoIcon({
  size,
}) {
  return <IllustrationPhotoIconSvg width={size} height={size} />;
}

IllustrationPhotoIcon.propTypes = propTypes;
IllustrationPhotoIcon.defaultProps = defaultProps;
