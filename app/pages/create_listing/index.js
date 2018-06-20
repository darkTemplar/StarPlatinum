import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { CREATE_LISTING_PREF_API_ENDPOINT } from './constants/api';
import { bootstrapData } from './actions/actionCreators';
import { get } from '../../shared/utils/fetch';
import BootstrapDataShape from './shapes/BootstrapDataShape';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';
import createListingBootstrapReducer from './reducers/createListingBootstrapReducer';
import createListingReducer from './reducers/createListingReducer';
import geocompleteReducer from '../../shared/components/Geocomplete/reducers/geocompleteReducer';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  bootstrapData: BootstrapDataShape.isRequired,
});

function filterResponse(response) {
  return {
    bootstrapData: _omit(response, ['status', 'message']),
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

  static getInitialProps({ req }) {
    if (req) {
      return req.api.get(CREATE_LISTING_PREF_API_ENDPOINT)
        .then(filterResponse);
    }

    return get(CREATE_LISTING_PREF_API_ENDPOINT)
      .then(filterResponse);
  }

  render() {
    return (
      <CreateListingPageContentContainer />
    );
  }
}

CreateListing.propTypes = propTypes;
CreateListing.contextTypes = contextTypes;

export default withPage(CreateListing, {
  geocomplete: geocompleteReducer,
  createListingBootstrap: createListingBootstrapReducer,
  createListing: createListingReducer,
});
