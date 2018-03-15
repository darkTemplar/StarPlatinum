import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import { withFilePropTypes } from '../../shapes/FileShape';
import Button from '../Button';
import Image from '../Image';
import Text from '../Text';

const propTypes = {
  onRemove: PropTypes.func.isRequired,
  ...withFilePropTypes,
  ...withStylesPropTypes,
};

export function UnstyledImagePreview({
  id,
  data,
  src,
  name,
  type,
  onRemove,
  styles,
}) {
  return (
    <div {...css(styles.imagePreview)} id={id}>
      <Image
        src={data || src}
        base64={!!(data)}
        imageContentType={type}
        alt={name}
        width={200}
      />
      <div {...css(styles.removeButton)}>
        <Button onPress={() => onRemove(id)}>
          <Text inverse>X</Text>
        </Button>
      </div>
    </div>
  );
}

UnstyledImagePreview.propTypes = propTypes;

export default withStyles(({ color, unit }) => ({
  imagePreview: {
    position: 'relative',
  },

  removeButton: {
    position: 'absolute',
    top: 2 * unit,
    right: 2 * unit,
    width: 3 * unit,
    height: 3 * unit,
    borderRadius: '50%',
    backgroundColor: color.greys.white,
  },
}))(UnstyledImagePreview);
