import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import { NAVBAR_ITEMS } from '../../shared/layout';
import { get } from '../../shared/utils/fetch';
import ListingShape from '../view_listing/shapes/ListingShape';
import withPage from '../../shared/page/withPage';

function filterResponse(response) {
  return {
    listings: _get(response, 'listings', []),
  };
}

const propTypes = forbidExtraProps({
  listings: PropTypes.arrayOf(ListingShape),
});

class BrowseListings extends React.PureComponent {
  static getInitialProps({ req }) {
    if (req) {
      return req.api.get('listings')
        .then(filterResponse);
    }

    return get('listings').then(filterResponse);
  }

  render() {
    console.log(this.props.listings);

    return (
      <div>
      </div>
    );
  }
}

BrowseListings.propTypes = propTypes;

export default withPage(BrowseListings, {
}, NAVBAR_ITEMS.ALL_LISTINGS);
