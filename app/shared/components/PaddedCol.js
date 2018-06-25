import { Col } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  children: PropTypes.node.isRequired,
  ...withStylesPropTypes,
};

export function UnstyledPaddedCol({
  children,
  styles,
  ...rest
}) {
  return (
    <Col {...rest}>
      <div {...css(styles.padded)}>
        {children}
      </div>
    </Col>
  );
}

UnstyledPaddedCol.propTypes = propTypes;

export default withStyles(({ unit }) => ({
  padded: {
    paddingLeft: 2 * unit,
    paddingRight: 2 * unit,
  },
}))(UnstyledPaddedCol);
