import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default function Link({
  href,
  children,
}) {
  return (
    <a href={href}>
      {children}
    </a>
  );
}

Link.propTypes = propTypes;
