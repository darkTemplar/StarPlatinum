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

export function UnstyledPageContainer({
  children,
  padded,
  styles,
}) {
  return (
    <div {...css(styles.container, padded && styles.padded)}>
      {children}
    </div>
  );
}

UnstyledPageContainer.propTypes = propTypes;
UnstyledPageContainer.defaultProps = defaultProps;

export default withStyles(({ unit, responsive }) => ({
  container: {
    width: '100%',
    margin: '0 auto',

    [responsive.mediumAndAbove]: {
      maxWidth: 110 * unit,
    },

    [responsive.largeAndAbove]: {
      maxWidth: 150 * unit,
    },
  },

  padded: {
    padding: `0 ${3 * unit}px`,
  },
}))(UnstyledPageContainer);
