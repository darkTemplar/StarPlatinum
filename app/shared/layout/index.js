// polyfill for promises
import 'es6-promise/auto';

import { Container, Row } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_WIDTH } from '../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import Header from '../header';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';

const propTypes = {
  children: PropTypes.node,
  ...withStylesPropTypes,
};

const defaultProps = {
  children: null,
};

const STATIC_SIGNED_IN_NAVBAR_ITEMS = [
  {
    id: 'nav-listing-create',
    icon: null,
    label: 'List a Property',
    url: '/listing/new',
  },
  {
    id: 'nav-my-listings',
    icon: null,
    label: 'My Listings',
    url: '/my-listings',
  },
];

// TODO, update active logic and move this to request level
function getNavbarItems() {
  return STATIC_SIGNED_IN_NAVBAR_ITEMS.map((item, idx) => ({
    ...item,
    active: idx === 0,
  }));
}

export function Layout({
  children,
  styles,
}) {
  return (
    <div {...css(styles.base)}>
      <PageContainer>
        <Container fluid>
          <Row>
            <Header />
          </Row>
          <Row>
            <div>
              <div {...css(styles.navbarContainer)}>
                <Navbar navbarItems={getNavbarItems()} />
              </div>
              <div {...css(styles.contentContainer)}>
                {children}
              </div>
            </div>
          </Row>
        </Container>
      </PageContainer>
    </div>
  );
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default withStyles(({
  unit,
  font,
  color,
  fontSource,
  responsive,
}) => ({
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
  },

  contentContainer: {
    padding: `0 ${2 * unit}px`,
    overflow: 'hidden',
  },

  navbarContainer: {
    display: 'none',

    [responsive.mediumAndAbove]: {
      width: NAVBAR_WIDTH,
      float: 'left',
      display: 'block',
    },
  },
}), { pureComponent: true })(Layout);
