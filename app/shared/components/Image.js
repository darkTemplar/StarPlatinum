import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  base64: PropTypes.bool,
  imageContentType: PropTypes.string,
  ...withStylesPropTypes,
};

const defaultProps = {
  width: undefined,
  height: undefined,
  base64: false,
  imageContentType: 'image/jpeg',
};

export function UnstyledImage({
  alt,
  width,
  height,
  src,
  imageContentType,
  base64,
  styles,
}) {
  const imageSource = base64 ? `data:${imageContentType};base64, ${src}` : src;

  return (
    <img
      alt={alt}
      src={imageSource}
      width={width}
      height={height}
      {...css(styles.image)}
    />
  );
}

UnstyledImage.propTypes = propTypes;
UnstyledImage.defaultProps = defaultProps;

export default withStyles(() => ({
  image: {
    width: '100%',
    height: 'auto',
  },
}))(UnstyledImage);
