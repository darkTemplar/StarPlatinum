// polyfill for promises
import 'es6-promise/auto';

import { Container, Row } from 'react-grid-system';
import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_WIDTH } from '../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import BrowsePropertiesIcon from '../components/icons/BrowsePropertiesIcon';
import CreateOfferIcon from '../components/icons/CreateOfferIcon';
import HeaderContainer from '../components/Header/HeaderContainer';
import ListPropertyIcon from '../components/icons/ListPropertyIcon';
import MyListingsIcon from '../components/icons/MyListingsIcon';
import MyOffersIcon from '../components/icons/MyOffersIcon';
import Navbar from '../components/Navbar';
import PageContainer from '../components/PageContainer';
import SignupLoginContainer from '../components/SignupLogin/SignupLoginContainer';
import UserShape from '../shapes/UserShape';
import WatchlistsIcon from '../components/icons/WatchlistsIcon';

export const MODAL_SLOT_DOCUMENT_ID = 'modal-slot';

const propTypes = {
  isNavExpanded: PropTypes.bool,
  currentUser: UserShape,
  children: PropTypes.node,
  ...withStylesPropTypes,
};

const defaultProps = {
  isNavExpanded: false,
  currentUser: null,
  children: null,
};

const STATIC_SIGNED_IN_NAVBAR_ITEMS = [
  {
    id: 'nav-listing-create',
    icon: ListPropertyIcon,
    label: 'List a Property',
    url: '/create_listing',
    as: '/listing/new',
  },
  {
    id: 'nav-my-listings',
    icon: MyListingsIcon,
    label: 'My Listings',
    url: '/',
  },
  {
    id: 'nav-offer-create',
    icon: CreateOfferIcon,
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

const STATIC_SIGNED_OUT_NAVBAR_ITEMS = [
  {
    id: 'nav-browse-properties',
    icon: BrowsePropertiesIcon,
    label: 'Browse Properties',
    url: '/',
  },
];

// TODO, update active logic and move this to request level
function getNavbarItems(currentUser = null) {
  const items = currentUser ? STATIC_SIGNED_IN_NAVBAR_ITEMS : STATIC_SIGNED_OUT_NAVBAR_ITEMS;

  return items.map((item, idx) => ({
    ...item,
    active: idx === 0,
  }));
}

export function UnstyledLayout({
  isNavExpanded,
  currentUser,
  children,
  styles,
}) {
  // todo, move font styles onto body
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
                  <Navbar navbarItems={getNavbarItems(currentUser)} />
                </div>
              )}
              <div {...css(styles.webContentTable)}>
                <div {...css(styles.webContentTableRow)}>
                  <div {...css(styles.navbarContainer)}>
                    <Navbar navbarItems={getNavbarItems(currentUser)} />
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
      <div id={MODAL_SLOT_DOCUMENT_ID} />
      <SignupLoginContainer />
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
    width: '100%',
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
      minWidth: NAVBAR_WIDTH,
    },
  },
}), { pureComponent: true })(UnstyledLayout);
