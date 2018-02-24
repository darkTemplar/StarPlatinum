import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  primary: mutuallyExclusiveTrueProps('primary', 'secondary'),
  secondary: mutuallyExclusiveTrueProps('primary', 'secondary'),
  type: PropTypes.oneOf(['submit', 'button']),
  size: PropTypes.oneOf(['xs', 'md', 'lg']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  buttonRef: PropTypes.func,
  children: PropTypes.node,
  ...withStylesPropTypes,
};

const defaultProps = {
  primary: true,
  secondary: false,
  type: 'button',
  size: 'md',
  loading: false,
  disabled: false,
  onPress: () => null,
  buttonRef: () => null,
  children: null,
};

// TODO add mobile touch support
export function UnstyledButton({
  primary,
  secondary,
  loading,
  disabled,
  onPress,
  children,
  buttonRef,
  styles,
  type,
  size,
}) {
  return (
    <button
      onClick={onPress}
      ref={buttonRef}
      type={type}
      {...css(
        styles.button,
        primary && styles.primary,
        secondary && styles.secondary,
        loading && styles.loading,
        disabled && styles.disabled,
        size === 'xs' && styles.xs,
        size === 'md' && styles.md,
        size === 'lg' && styles.lg,
      )}
    >
      {children}
    </button>
  );
}

UnstyledButton.propTypes = propTypes;
UnstyledButton.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  button: {
    '-webkit-appearance': 'none',

    ':hover': {

    },

    ':focus': {

    },

    ':active': {

    },
  },

  primary: {
    backgroundColor: color.core.primary,
    borderRadius: 3,
    padding: 1.5 * unit,
    color: color.core.white,
  },

  secondary: {

  },

  loading: {

  },

  disabled: {

  },

  xs: {

  },

  md: {

  },

  lg: {

  },
}), { pureComponent: true })(UnstyledButton);
