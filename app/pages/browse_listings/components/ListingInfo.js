import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';

import ListingShape from '../../view_listing/shapes/ListingShape';
import PropertyShape from '../../view_listing/shapes/PropertyShape';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape,
});

const defaultProps = {
  property: null,
};

export default function ListingInfo({
  listing,
  property,
}) {
  const { formatted_address: formattedAddress } = property;

  return (
    <div>
      {formattedAddress}
    </div>
  );
}

ListingInfo.propTypes = propTypes;
ListingInfo.defaultProps = defaultProps;
