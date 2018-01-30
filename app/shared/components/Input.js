import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles, withStylePropTypes } from '../hocs/withStyles';

const propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'tel']).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  lg: PropTypes.bool,
  inline: PropTypes.bool,
  borderlessTop: PropTypes.bool,
  borderlessRight: PropTypes.bool,
  borderlessBottom: PropTypes.bool,
  borderlessLeft: PropTypes.bool,
  ...withStylePropTypes,
};

const defaultProps = {
  inline: false,
  lg: false,
  borderlessTop: false,
  borderlessRight: false,
  borderlessBottom: false,
  borderlessLeft: false,
  value: '',
  name: '',
  inputRef() {},
};

export function Input({
  type,
  label,
  id,
  onChange,
  inline,
  value,
  borderlessTop,
  borderlessRight,
  borderlessBottom,
  borderlessLeft,
  lg,
  styles,
  name,
  inputRef,
  autoFocus,
}) {
  return (
    <div
      {...css(
        styles.inputContainer,
        lg && styles.inputContainerLarge,
        borderlessTop && { borderTop: 'none' },
        borderlessRight && { borderRight: 'none' },
        borderlessBottom && { borderBottom: 'none' },
        borderlessLeft && { borderLeft: 'none' },
      )}
    >
      <label
        htmlFor={id}
        {...css(styles.label, lg && styles.labelLarge)}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name || id}
        type={type}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        autoFocus
        {...css(styles.input, lg && styles.inputLarge)}
      />
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default withStyles(({ color, unit, font }) => ({
  inputContainer: {
    border: `1px solid ${color.border}`,
    paddingTop: 0.5 * unit,
  },

  inputContainerLarge: {
    fontSize: font.large,
    paddingTop: unit,
  },

  input: {
    '-webkit-appearance': 'none',
    border: 'none',
    display: 'block',
    width: '100%',
    padding: unit,
    boxSizing: 'border-box',
    fontSize: font.medium,
  },

  inputLarge: {
    fontSize: font.large,
    padding: `${1.5 * unit}px ${unit}px`,
  },

  label: {
    color: color.greys.cloud,
    fontSize: font.small,
    letterSpacing: 1,
    padding: `0 ${1 * unit}px`,
  },
}), { pureComponent: true })(Input);
