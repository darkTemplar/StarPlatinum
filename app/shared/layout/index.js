// polyfill for promises
import 'es6-promise/auto';

import { Container, Row } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_WIDTH } from '../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import BrowsePropertiesIcon from '../components/icons/BrowsePropertiesIcon';
import HeaderContainer from '../components/Header/HeaderContainer';
import IllustrationDisclosureIcon from '../components/icons/IllustrationDisclosureIcon';
import IllustrationPhotoIcon from '../components/icons/IllustrationPhotoIcon';
import MyListingsIcon from '../components/icons/MyListingsIcon';
import MyOffersIcon from '../components/icons/MyOffersIcon';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';
import WatchlistsIcon from '../components/icons/WatchlistsIcon';

const propTypes = {
  isNavExpanded: PropTypes.bool,
  children: PropTypes.node,
  ...withStylesPropTypes,
};

const defaultProps = {
  isNavExpanded: false,
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

export function UnstyledLayout({
  isNavExpanded,
  children,
  styles,
}) {
  return (
    <div {...css(styles.base)}>
      <PageContainer>
        <Container fluid>
          <Row>
            <HeaderContainer />
          </Row>
          <Row>
            <div>
              {isNavExpanded && (
                <div {...css(styles.navbarContainerMobile)}>
                  <Navbar navbarItems={getNavbarItems()} />
                </div>
              )}
              <div {...css(styles.webContentTable)}>
                <div {...css(styles.webContentTableRow)}>
                  <div {...css(styles.navbarContainer)}>
                    <Navbar navbarItems={getNavbarItems()} />
                  </div>
                  <div {...css(styles.contentContainer)}>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </PageContainer>
    </div>
  );
}

UnstyledLayout.propTypes = propTypes;
UnstyledLayout.defaultProps = defaultProps;

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
    display: 'table-cell',
  },

  webContentTable: {
    display: 'table',
  },

  webContentTableRow: {
    display: 'table-row',
  },

  navbarContainerMobile: {
    background: color.greys.white,
    position: 'absolute',
    left: 0,
    width: '60%',
    height: '100%',
    zIndex: 1,

    [responsive.smallAndAbove]: {
      width: NAVBAR_WIDTH,
    },

    [responsive.mediumAndAbove]: {
      display: 'none',
    },
  },

  navbarContainer: {
    display: 'none',
    width: NAVBAR_WIDTH,
    background: color.greys.white,

    [responsive.mediumAndAbove]: {
      display: 'table-cell',
    },
  },
}), { pureComponent: true })(UnstyledLayout);
