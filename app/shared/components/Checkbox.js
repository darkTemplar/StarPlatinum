import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import DoneIcon from './icons/DoneIcon';
import Spacing from './Spacing';
import Text from './Text';
import color from '../styles/color';

const propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  ...withStylesPropTypes,
};

const defaultProps = {
  onChange: () => null,
  checked: undefined,
};

export class UnstyledCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkboxRef = this.checkboxRef.bind(this);
  }

  componentDidMount() {
    this.checkbox.checked = this.props.checked;
  }

  checkboxRef(checkbox) {
    this.checkbox = checkbox;
  }

  render() {
    const {
      id,
      label,
      name,
      onChange,
      checked,
      styles,
    } = this.props;

    return (
      <label {...css(styles.checkbox)} htmlFor={id}>
        <div {...css(styles.checkboxContainer)}>
          <input
            type="checkbox"
            name={name}
            id={id}
            onChange={onChange}
            checked={checked}
            ref={this.checkboxRef}
            {...css(styles.input)}
          />
          {checked && (
            <div {...css(styles.checkmark)}>
              <DoneIcon size={10} color={color.core.white} />
            </div>
          )}
        </div>
        <Spacing left={1} inline>
          <Text inline>{label}</Text>
        </Spacing>
      </label>
    );
  }
}

UnstyledCheckbox.propTypes = propTypes;
UnstyledCheckbox.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  checkboxContainer: {
    position: 'relative',
    display: 'inline-block',
  },

  checkmark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    marginTop: 1,
  },

  checkbox: {
    cursor: 'pointer',
  },

  input: {
    width: 3 * unit,
    height: 3 * unit,
    border: `1px solid ${color.border}`,
    borderRadius: unit / 4,
    verticalAlign: 'middle',
    background: color.core.white,
    '-webkit-appearance': 'none',

    ':checked': {
      background: color.core.primary,
    },
  },
}))(UnstyledCheckbox);
