import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

export default function Layout({
  children,
}) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
