import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles } from '../hocs/withStyles';
import Header from '../header';

const propTypes = {
  styles: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

export function Layout({
  children,
  styles,
}) {
  return (
    <div {...css(styles.base)}>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default withStyles(({ font, color }) => ({
  base: {
    fontSize: font.medium,
    color: color.core.black,
  },
}), { pureComponent: true })(Layout);