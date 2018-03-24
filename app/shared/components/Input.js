import _omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylePropTypes } from '../hocs/withStyles';
import Text from './Text';

const propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'search', 'tel', 'date']).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  lg: PropTypes.bool,
  inline: PropTypes.bool,
  borderlessTop: PropTypes.bool,
  borderlessRight: PropTypes.bool,
  borderlessBottom: PropTypes.bool,
  borderlessLeft: PropTypes.bool,
  nativeOnChange: PropTypes.bool,
  ...withStylePropTypes,
};

const defaultProps = {
  inline: false,
  lg: false,
  borderlessTop: false,
  borderlessRight: false,
  borderlessBottom: false,
  borderlessLeft: false,
  value: undefined,
  name: '',
  nativeOnChange: false,
  inputRef() {},
};

export function UnstyledInput({
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
  nativeOnChange,
  ...rest
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
        <Text small muted inline>{label}</Text>
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name || id}
        type={type}
        onChange={nativeOnChange ? onChange : (e) => {
          onChange(e.target.value);
        }}
        value={value}
        {...css(styles.input, lg && styles.inputLarge)}
        {..._omit(rest, 'className')}
      />
    </div>
  );
}

UnstyledInput.propTypes = propTypes;
UnstyledInput.defaultProps = defaultProps;

export default withStyles(({ color, unit, font }) => ({
  inputContainer: {
    border: `1px solid ${color.border}`,
    paddingTop: 0.5 * unit,
    background: color.core.white,
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
    padding: `0 ${1 * unit}px`,
  },
}), { pureComponent: true })(UnstyledInput);
