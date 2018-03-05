import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  id: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  id: undefined,
};

export default function Link({
  id,
  href,
  children,
}) {
  return (
    <a href={href} id={id}>
      {children}
    </a>
  );
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
