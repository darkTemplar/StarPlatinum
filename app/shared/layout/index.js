import { Container } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles } from '../hocs/withStyles';
import Header from '../header';
import Text from '../components/Text';

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
    <div {...css(styles.base, styles.maxPageWidth)}>
      <Container fluid  >
        <Header />
        <div>
          {children}
        </div>
      </Container>
    </div>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default withStyles(({ font, unit, color, fontFamily, fontSource }) => ({
  base: {
    fontSize: font.medium,
    color: color.core.black,
    lineHeight: 1.48,
    fontFamily: [
      fontSource.regular,
      fontSource.bold,
      fontSource.semiBold,
      fontSource.extraBold,
    ],
    fontSize: font.medium,
  },

  maxPageWidth: {
    maxWidth: 135 * unit,
    margin: '0 auto',
  },
}), { pureComponent: true })(Layout);