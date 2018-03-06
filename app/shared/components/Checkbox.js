import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import Spacing from './Spacing';
import Text from './Text';

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
      <label htmlFor={id}>
        <input
          type="checkbox"
          name={name}
          id={id}
          onChange={onChange}
          checked={checked}
          ref={this.checkboxRef}
          {...css(styles.input)}
        />
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
