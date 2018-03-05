// polyfill for promises
import 'es6-promise/auto';

import { Container, Row } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_WIDTH } from '../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import BrowsePropertiesIcon from '../components/icons/BrowsePropertiesIcon';
import Header from '../header';
import IllustrationPhotoIcon from '../components/icons/IllustrationPhotoIcon';
import IllustrationDisclosureIcon from '../components/icons/IllustrationDisclosureIcon';
import MyListingsIcon from '../components/icons/MyListingsIcon';
import MyOffersIcon from '../components/icons/MyOffersIcon';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';
import WatchlistsIcon from '../components/icons/WatchlistsIcon';

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
    icon: MyListingsIcon,
    label: 'List a Property',
    url: '/listing/new',
  },
  {
    id: 'nav-my-listings',
    icon: IllustrationPhotoIcon,
    label: 'My Listings',
    url: '/',
  },
  {
    id: 'nav-offer-create',
    icon: IllustrationDisclosureIcon,
    label: 'Make an Offer',
    url: '/',
  },
  {
    id: 'nav-my-offers',
    icon: MyOffersIcon,
    label: 'My Offers',
    url: '/',
  },
  {
    id: 'nav-watchlists',
    icon: WatchlistsIcon,
    label: 'Watchlists',
    url: '/',
  },
  {
    id: 'nav-browse-properties',
    icon: BrowsePropertiesIcon,
    label: 'Browse Properties',
    url: '/',
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
