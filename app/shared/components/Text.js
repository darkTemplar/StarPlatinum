import {
  forbidExtraProps,
  mutuallyExclusiveTrueProps
} from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  bold: PropTypes.bool,
  inline: PropTypes.bool,
  error: mutuallyExclusiveTrueProps('primary', 'inverse', 'muted', 'error'),
  muted: mutuallyExclusiveTrueProps('primary', 'inverse', 'muted', 'error'),
  inverse: mutuallyExclusiveTrueProps('primary', 'inverse', 'muted', 'error'),
  primary: mutuallyExclusiveTrueProps('primary', 'inverse', 'muted', 'error'),
  ...withStylesPropTypes,
});

const defaultProps = {
  size: 'md',
  bold: false,
  inline: false,
  muted: false,
  primary: false,
  inverse: false,
  error: false,
};

export function UnstyledText({
  children,
  size,
  bold,
  muted,
  inline,
  styles,
  inverse,
  primary,
  error,
}) {
  const Component = inline ? 'span' : 'div';

  return (
    <Component
      {...css(
        styles.text,
        size === 'xs' && styles.xs,
        size === 'sm' && styles.sm,
        size === 'md' && styles.md,
        size === 'lg' && styles.lg,
        size === 'xl' && styles.xl,
        bold && styles.bold,
        bold && size === 'md' && styles.mdBold,
        muted && styles.muted,
        inverse && styles.inverse,
        primary && styles.primary,
        error && styles.error,
      )}
    >
      {children}
    </Component>
  );
}

UnstyledText.propTypes = propTypes;
UnstyledText.defaultProps = defaultProps;

export default withStyles(({ font, color, fontFamily }) => ({
  text: {
    color: color.core.black,
  },

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

  primary: {
    color: color.core.primary,
  },

  inverse: {
    color: color.core.white,
  },

  error: {
    color: color.core.flame,
  },
}), { pureComponent: true })(UnstyledText);
