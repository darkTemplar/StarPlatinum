import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import Loader from './Loader';

const propTypes = {
  primary: mutuallyExclusiveTrueProps('primary', 'secondary'),
  secondary: mutuallyExclusiveTrueProps('primary', 'secondary'),
  type: PropTypes.oneOf(['submit', 'button']),
  size: PropTypes.oneOf(['xs', 'md', 'lg']),
  block: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  buttonRef: PropTypes.func,
  children: PropTypes.node,
  ...withStylesPropTypes,
};

const defaultProps = {
  primary: false,
  secondary: false,
  type: 'button',
  size: 'md',
  block: false,
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
  block,
  size,
}) {
  return (
    <button
      onClick={onPress}
      ref={buttonRef}
      type={type}
      disabled={disabled}
      {...css(
        styles.button,
        primary && styles.primary,
        secondary && styles.secondary,
        loading && styles.loading,
        disabled && styles.disabled,
        block && styles.block,
        size === 'xs' && styles.xs,
        size === 'md' && styles.md,
        size === 'lg' && styles.lg,
      )}
    >
      {loading && <Loader />}
      {!loading && children}
    </button>
  );
}

UnstyledButton.propTypes = propTypes;
UnstyledButton.defaultProps = defaultProps;

export default withStyles(({ color, unit, font }) => ({
  button: {
    '-webkit-appearance': 'none',
    padding: `${1.5 * unit}px ${2.5 * unit}px`,
    cursor: 'pointer',
    borderRadius: 4,

    ':hover': {

    },

    ':focus': {

    },

    ':active': {

    },
  },

  primary: {
    backgroundColor: color.core.primary,
    color: color.core.white,
  },

  secondary: {
    backgroundColor: color.greys.haze,
    color: color.core.black,
  },

  loading: {

  },

  disabled: {
    opacity: 0.4,
  },

  block: {
    width: '100%',
  },

  xs: {

  },

  md: {
    fontSize: font.medium,
  },

  lg: {
    height: 50,
    fontSize: font.large,
  },
}), { pureComponent: true })(UnstyledButton);
