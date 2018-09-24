import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import BrowseListingCard from './BrowseListingCard';
import ListingShape from '../../view_listing/shapes/ListingShape';

const propTypes = forbidExtraProps({
  listings: PropTypes.arrayOf(ListingShape),
});

const defaultProps = {
  listings: [],
};

export default function BrowseListings({
  listings,
}) {
  return (
    <div>
      {/* filters */}
      {listings.map(listing => (
        <BrowseListingCard
          key={listing.id}
          listing={listing}
        />
      ))}
      {/* pagination */}
    </div>
  );
}

BrowseListings.propTypes = propTypes;
BrowseListings.defaultProps = defaultProps;
