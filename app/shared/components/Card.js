import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  ...withStylesPropTypes,
};

const defaultProps = {
  padded: false,
};

export function UnstyledCard({
  styles,
  padded,
  children,
}) {
  return (
    <div {...css(styles.card, padded && styles.padded)}>
      {children}
    </div>
  );
}

UnstyledCard.propTypes = propTypes;
UnstyledCard.defaultProps = defaultProps;

export default withStyles(({ unit, color }) => ({
  card: {
    background: color.core.white,
    boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.08)',
  },

  padded: {
    padding: 2 * unit,
  },
}), { pureComponent: true })(UnstyledCard);
