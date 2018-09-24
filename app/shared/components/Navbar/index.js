import PropTypes from 'prop-types';
import React from 'react';

import NavbarItem from './NavbarItem';
import NavbarItemShape from './NavbarItemShape';

const propTypes = {
  currentNavId: PropTypes.string,
  navbarItems: PropTypes.arrayOf(NavbarItemShape),
};

const defaultProps = {
  currentNavId: null,
  navbarItems: [],
};

export default function Navbar({
  navbarItems,
  currentNavId,
}) {
  if (!navbarItems.length) {
    return null;
  }

  return (
    <nav>
      {navbarItems.map(navbarItem => (
        <NavbarItem
          key={navbarItem.id}
          {...navbarItem}
          active={navbarItem.id === currentNavId}
        />
      ))}
    </nav>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
