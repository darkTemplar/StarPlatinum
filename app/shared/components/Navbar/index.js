import PropTypes from 'prop-types';
import React from 'react';

import NavbarItem from './NavbarItem';
import NavbarItemShape from './NavbarItemShape';

const propTypes = {
  navbarItems: PropTypes.arrayOf(NavbarItemShape),
};

const defaultProps = {
  navbarItems: [],
};

export default function Navbar({
  navbarItems,
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
        />
      ))}
    </nav>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
