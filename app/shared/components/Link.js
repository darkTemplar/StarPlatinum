import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = forbidExtraProps({
  id: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  ...withStylesPropTypes,
});

const defaultProps = {
  id: undefined,
  href: undefined,
  onPress: undefined,
};

export function UnstyledLink({
  id,
  href,
  children,
  onPress,
  styles,
}) {
  if (onPress) {
    return (
      <button {...css(styles.buttonLink)} onClick={onPress}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} id={id}>
      {children}
    </a>
  );
}

UnstyledLink.propTypes = propTypes;
UnstyledLink.defaultProps = defaultProps;

export default withStyles(() => ({
  buttonLink: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    webkitAppearance: 'none',
  },
}))(UnstyledLink);
