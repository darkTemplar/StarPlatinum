import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import BrowseListingCard from './BrowseListingCard';
import ListingShape from '../../view_listing/shapes/ListingShape';
import PropertyShape from '../../view_listing/shapes/PropertyShape';
import Spacing from '../../../shared/components/Spacing';

const propTypes = forbidExtraProps({
  listings: PropTypes.arrayOf(ListingShape),
  listingDocuments: PropTypes.arrayOf(PropTypes.array),
  properties: PropTypes.arrayOf(PropertyShape),
});

const defaultProps = {
  listings: [],
  listingDocuments: [],
  properties: [],
};

export default function BrowseListings({
  listings,
  listingDocuments,
  properties,
}) {
  return (
    <div>
      {/* filters */}
      {listings.map((listing, idx) => (
        <Spacing bottom={idx !== listings.length - 1 ? 2 : 0}>
          <BrowseListingCard
            key={listing.id}
            listing={listing}
            listingDocuments={listingDocuments[idx] || null}
            property={properties[idx] || null}
          />
        </Spacing>
      ))}
      {/* pagination */}
    </div>
  );
}

BrowseListings.propTypes = propTypes;
BrowseListings.defaultProps = defaultProps;
