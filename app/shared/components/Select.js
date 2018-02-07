import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import SelectOptionShape from '../shapes/SelectOptionShape';
import Text from './Text';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(SelectOptionShape).isRequired,
  selectRef: PropTypes.func,
  borderlessTop: PropTypes.bool,
  borderlessRight: PropTypes.bool,
  borderlessBottom: PropTypes.bool,
  borderlessLeft: PropTypes.bool,
  lg: PropTypes.bool,
  ...withStylesPropTypes,
};

const defaultProps = {
  selectRef() {},
  borderlessTop: false,
  borderlessRight: false,
  borderlessBottom: false,
  borderlessLeft: false,
  lg: false,
};

export function Select({
  onChange,
  label,
  name,
  id,
  selectRef,
  borderlessTop,
  borderlessRight,
  borderlessBottom,
  borderlessLeft,
  lg,
  styles,
  options,
  ...otherProps,
}) {
  return (
    <div
      {...css(
        styles.selectContainer,
        lg && styles.selectContainerLarge,
        borderlessTop && { borderTop: 'none' },
        borderlessRight && { borderRight: 'none' },
        borderlessBottom && { borderBottom: 'none' },
        borderlessLeft && { borderLeft: 'none' },
      )}
    >
      <label
        htmlFor={id}
        {...css(styles.label)}
      >
        <Text small inline muted>{label}</Text>
      </label>
      <div {...css(styles.actualSelectWrapper)}>
        <select
          id={id}
          name={name}
          ref={selectRef}
          onChange={onChange}
          {...css(styles.select, lg && styles.selectLarge)}
          {...otherProps}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div {...css(styles.chevron)}>
          >
        </div>
      </div>
    </div>
  );
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default withStyles(({ unit, color, font }) => ({
  selectContainer: {
    border: `1px solid ${color.border}`,
    paddingTop: 0.5 * unit,
    background: color.core.white,
  },

  selectContainerLarge: {
    fontSize: font.large,
    paddingTop: unit,
  },

  select: {
    '-webkit-appearance': 'none',
    background: 'none',
    border: 'none',
    display: 'block',
    width: '100%',
    padding: unit,
    boxSizing: 'border-box',
    fontSize: font.medium,
    paddingRight: 6 * unit,
  },

  selectLarge: {
    fontSize: font.large,
    padding: `${1.5 * unit}px ${unit}px`,
  },

  label: {
    padding: `0 ${1 * unit}px`,
  },

  actualSelectWrapper: {
    position: 'relative',
  },

  chevron: {
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4 * unit,
    height: '100%',
  },
}), { pureComponent: true })(Select);