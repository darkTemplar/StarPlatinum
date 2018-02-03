import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  bold: PropTypes.bool,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  ...withStylesPropTypes,
};

const defaultProps = {
  size: 'md',
  bold: false,
  inline: false,
  muted: false,
};

export function Text({
  children,
  size,
  bold,
  muted,
  inline,
  styles,
}) {
  const Component = inline ? 'span' : 'div';

  return (
    <Component
      {...css(
        size === 'xs' && styles.xs,
        size === 'sm' && styles.sm,
        size === 'md' && styles.md,
        size === 'lg' && styles.lg,
        bold && styles.bold,
        muted && styles.muted,
      )}
    >
      {children}
    </Component>
  );
}

Text.propTypes = propTypes;

export default withStyles(({ font, color }) => ({
  bold: {
    fontWeight: 'bold',
  },

  xs: {
    fontSize: font.xsmall,
  },

  sm: {
    fontSize: font.small,
  },

  md: {
    fontSize: font.medium,
  },

  lg: {
    fontSize: font.large,
  },

  muted: {
    color: color.greys.cloud,
  },
}), { pureComponent: true })(Text);
