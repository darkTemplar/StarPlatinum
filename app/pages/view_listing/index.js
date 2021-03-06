import { forbidExtraProps } from 'airbnb-prop-types';
import url from 'url';
import PropTypes from 'prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { FILE_TYPE_IMAGE } from '../create_listing/constants/form';
import { LISTING_API } from './constants/api';
import { LISTING_STATUS } from '../../shared/listing/status';
import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../shared/hocs/withStyles';
import { get } from '../../shared/utils/fetch';
import CustomMap from '../../shared/map';
import DescriptionCard from './components/DescriptionCard';
import GeometryShape from './shapes/GeometryShape';
import InfoCard from './components/InfoCard';
import ListingPreviewActionsContainer from './containers/ListingPreviewActionsContainer';
import ListingShape from './shapes/ListingShape';
import PropertyDetailsCard from './components/PropertyDetailsCard';
import PropertyShape from './shapes/PropertyShape';
import Spacing from '../../shared/components/Spacing';
import previewListingReducer from './reducers/previewListingReducer';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape.isRequired,
  listing_documents: PropTypes.arrayOf(PropTypes.array).isRequired,
  geometry: GeometryShape.isRequired,
  agent_preferences: PropTypes.arrayOf(PropTypes.array),
  formatted_address: PropTypes.string.isRequired,
  ...withStylesPropTypes,
});

function filterResponse(response) {
  return _omit(response, ['status', 'message', 'user']);
}

export class UnstyledViewListing extends React.PureComponent {
  static getInitialProps({ req, query, asPath = '' }) {
    if (req) {
      const { params: { listingId } } = req;
      return req.api.get(`${LISTING_API}/${listingId}`)
        .then(filterResponse);
    }

    let { listingId } = query;

    if (!listingId) {
      const matchedListingIdParts = asPath.match(/listings\/(\d+)/i);

      listingId = matchedListingIdParts[1];
    }

    return get(`${LISTING_API}/${listingId}`)
      .then(filterResponse);
  }

  render() {
    const { property, geometry, listing, listing_documents: listingDocuments, styles } = this.props;
    const { status } = listing;

    return (
      <div>
        {status === LISTING_STATUS.REVIEW && (
          <ListingPreviewActionsContainer
            listing={listing}
          />
        )}
        <InfoCard
          geometry={geometry}
          listing={listing}
          property={property}
          images={listingDocuments.filter(doc => doc[1] === FILE_TYPE_IMAGE).map(doc => doc[0])}
        />
        <Spacing top={2}>
          <DescriptionCard />
        </Spacing>
        <Spacing top={2}>
          <PropertyDetailsCard />
        </Spacing>
        <Spacing top={2}>
          <CustomMap
            center={geometry.location}
            marker={geometry.location}
            defaultZoom={13}
            loadingElement={<div {...css(styles.mapContainer)} />}
            containerElement={<div {...css(styles.mapContainer)} />}
            mapElement={<div {...css(styles.map)} />}
          />
        </Spacing>
      </div>
    );
  }
}

UnstyledViewListing.propTypes = propTypes;

const StyledViewListing = withStyles(() => ({
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '75%',
  },

  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}))(UnstyledViewListing);

export default withPage(StyledViewListing, {
  previewListing: previewListingReducer,
});
