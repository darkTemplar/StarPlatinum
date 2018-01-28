import { Container } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'aphrodite';

import { APHRODITE_DATA_KEY } from '../constants';
import { css, withStyles } from '../hocs/withStyles';
import Header from '../header';
import isBrowser from '../utils/isBrowser';

const propTypes = {
  styles: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

export class Layout extends React.Component {
  render() {
    const { children, styles } = this.props;

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
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default withStyles(({ font, unit, color }) => ({
  base: {
    fontSize: font.medium,
    color: color.core.black,
  },

  maxPageWidth: {
    width: 135 * unit,
    margin: '0 auto',
  },
}), { pureComponent: true })(Layout);