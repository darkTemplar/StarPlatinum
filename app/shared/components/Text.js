import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
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
        bold && size === 'md' && styles.mdBold,
        muted && styles.muted,
      )}
    >
      {children}
    </Component>
  );
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default withStyles(({ font, color, fontFamily }) => ({
  bold: {
    fontFamily: fontFamily.bold,
  },

  xs: {
    fontSize: font.xsmall,
    fontFamily: fontFamily.regular,
  },

  sm: {
    fontSize: font.small,
  },

  md: {
    fontSize: font.medium,
  },

  mdBold: {
    fontFamily: fontFamily.semiBold,
  },

  lg: {
    fontSize: font.large,
  },

  xl: {
    fontSize: font.xlarge,
  },

  muted: {
    color: color.greys.cloud,
  },
}), { pureComponent: true })(Text);
