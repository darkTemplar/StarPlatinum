import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import NavbarItem from './NavbarItem';
import NavbarItemShape from './NavbarItemShape';

const propTypes = {
  navbarItems: PropTypes.arrayOf(NavbarItemShape),
  ...withStylesPropTypes,
};

const defaultProps = {
  navbarItems: [],
};

export function UnstyledNavbar({
  navbarItems,
  styles,
}) {
  if (!navbarItems.length) {
    return null;
  }

  return (
    <nav {...css(styles.navbar)}>
      {navbarItems.map(navbarItem => (
        <NavbarItem
          key={navbarItem.id}
          {...navbarItem}
        />
      ))}
    </nav>
  );
}

UnstyledNavbar.propTypes = propTypes;
UnstyledNavbar.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  navbar: {
    background: color.greys.white,
  },
}))(UnstyledNavbar);
