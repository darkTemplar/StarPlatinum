import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { LISTING_API } from './constants/api';
import { get } from '../../shared/utils/fetch';
import DescriptionCard from './components/DescriptionCard';
import GeometryShape from './shapes/GeometryShape';
import InfoCard from './components/InfoCard';
import ListingDocumentShape from './shapes/ListingDocumentShape';
import ListingShape from './shapes/ListingShape';
import PropertyDetailsCard from './components/PropertyDetailsCard';
import PropertyShape from './shapes/PropertyShape';
import Spacing from '../../shared/components/Spacing';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape.isRequired,
  listing_documents: PropTypes.arrayOf(ListingDocumentShape).isRequired,
  geometry: GeometryShape.isRequired,
});

function filterResponse(response) {
  return _omit(response, ['status', 'message', 'user']);
}

export class ViewListing extends React.PureComponent {
  static getInitialProps({ req, query }) {
    if (req) {
      const { params: { listingId } } = req;
      return req.api.get(`${LISTING_API}/${listingId}`)
        .then(filterResponse);
    }

    const { listingId } = query;
    return get(`${LISTING_API}/${listingId}`)
      .then(filterResponse);
  }

  render() {
    const { property, geometry, listing } = this.props;

    return (
      <div>
        <InfoCard
          geometry={geometry}
          listing={listing}
          property={property}
        />
        <Spacing top={2}>
          <DescriptionCard />
        </Spacing>
        <Spacing top={2}>
          <PropertyDetailsCard />
        </Spacing>
      </div>
    );
  }
}

ViewListing.propTypes = propTypes;

export default withPage(ViewListing);
