import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

import { CREATE_LISTING_PREF_API_ENDPOINT } from './constants/api';
import { FORM_FIELD_PHOTOS, FORM_FIELD_DISCLOSURES, FORM_FIELD_GEO } from './constants/form';
import { bootstrapData } from './actions/actionCreators';
import { get } from '../../shared/utils/fetch';
import BootstrapDataShape from './shapes/BootstrapDataShape';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';
import ListingShape from './shapes/ListingShape';
import createListingBootstrapReducer from './reducers/createListingBootstrapReducer';
import createListingReducer from './reducers/createListingReducer';
import geocompleteReducer from '../../shared/components/Geocomplete/reducers/geocompleteReducer';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  bootstrapData: BootstrapDataShape.isRequired,
  listing: ListingShape,
});

const defaultProps = {
  listing: null,
};

function filterPreferencesResponse(response) {
  return {
    bootstrapData: _omit(response, ['status', 'message']),
  };
}

function filterListingResponse(response) {
  return {
    listing: {
      ..._get(response, 'listing'),
      [FORM_FIELD_PHOTOS]: [],
      [FORM_FIELD_DISCLOSURES]: [],
      [FORM_FIELD_GEO]: _get(response, 'property.place_id', ''),
    },
  };
}

const contextTypes = {
  store: PropTypes.object.isRequired,
};

export class CreateListing extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.context.store.dispatch(bootstrapData(this.props.bootstrapData));
  }

  static getInitialProps({ req, query }) {
    if (req) {
      const { params: { listingId } = {} } = req;
      const getPreferencesPromise = req.api.get(CREATE_LISTING_PREF_API_ENDPOINT);

      if (typeof listingId !== 'undefined') {
        const getEditListingPromise = req.api.get(`listings/${listingId}/edit`);

        return Promise.all([
          getPreferencesPromise,
          getEditListingPromise,
        ]).then(([perefencesResponse, editListingResponse]) => ({
          ...filterListingResponse(editListingResponse),
          ...filterPreferencesResponse(perefencesResponse),
        }));
      }

      return getPreferencesPromise.then(filterPreferencesResponse);
    }

    const clientPreferencesPromise = get(CREATE_LISTING_PREF_API_ENDPOINT);

    if (query && query.listingId) {
      return Promise.all([
        clientPreferencesPromise,
        get(`listings/${query.listingId}/edit`),
      ]).then(([perefencesResponse, editListingResponse]) => ({
        ...filterListingResponse(editListingResponse),
        ...filterPreferencesResponse(perefencesResponse),
      }));
    }

    return clientPreferencesPromise.then(filterPreferencesResponse);
  }

  render() {
    return (
      <CreateListingPageContentContainer
        listing={this.props.listing}
      />
    );
  }
}

CreateListing.propTypes = propTypes;
CreateListing.defaultProps = defaultProps;
CreateListing.contextTypes = contextTypes;

export default withPage(CreateListing, {
  geocomplete: geocompleteReducer,
  createListingBootstrap: createListingBootstrapReducer,
  createListing: createListingReducer,
});
