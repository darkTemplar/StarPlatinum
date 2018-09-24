import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';

import Card from '../../../shared/components/Card';
import ListingShape from '../../view_listing/shapes/ListingShape';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
});

export default function BrowseListingCard({
  listing,
}) {
  return (
    <Card>
      {listing.id}
    </Card>
  );
}

BrowseListingCard.propTypes = propTypes;
