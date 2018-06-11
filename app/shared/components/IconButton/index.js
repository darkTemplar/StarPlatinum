import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';

const propTypes = forbidExtraProps({
  icon: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  ...withStylesPropTypes,
});

export function UnstyledIconButton({
  icon,
  onPress,
  styles,
}) {
  return (
    <button {...css(styles.button)} onClick={onPress}>
      {icon}
    </button>
  );
}

UnstyledIconButton.propTypes = propTypes;

export default withStyles(() => ({
  button: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    webkitAppearance: 'none',
  },
}))(UnstyledIconButton);
