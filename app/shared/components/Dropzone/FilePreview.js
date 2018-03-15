import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import { withFilePropTypes } from '../../shapes/FileShape';
import FlexBar from '../FlexBar';
import Button from '../Button';
import Text from '../Text';

const propTypes = {
  onRemove: PropTypes.func.isRequired,
  noBorder: PropTypes.bool,
  ...withFilePropTypes,
  ...withStylesPropTypes,
};

const defaultProps = {
  noBorder: false,
};

export function FilePreview({
  id,
  name,
  onRemove,
  noBorder,
  styles,
}) {
  return (
    <div {...css(styles.filePreview, noBorder && styles.noBorder)} id={id}>
      <FlexBar
        after={
          <Button onPress={() => onRemove(id)}>
            X
          </Button>
        }
      >
        <Text>{name}</Text>
      </FlexBar>
    </div>
  );
}

FilePreview.propTypes = propTypes;
FilePreview.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  filePreview: {
    borderBottom: `1px solid ${color.border}`,
    padding: unit,
  },

  noBorder: {
    borderBottom: 'none',
  },
}))(FilePreview);
