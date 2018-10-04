import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../../../shared/components/Image';

const propTypes = forbidExtraProps({
  imageSrc: PropTypes.string,
});

const defaultProps = {
  imageSrc: null,
};

export default function ListingImage({
  imageSrc,
}) {
  const finalSource = imageSrc || 'placeholder';

  return (
    <Image src={finalSource} alt="image for listing" />
  );
}

ListingImage.propTypes = propTypes;
ListingImage.defaultProps = defaultProps;
