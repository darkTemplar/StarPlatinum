import React from 'react';

import { CREATE_LISTING_PREF_API_ENDPOINT } from './constants/api';
import { get } from '../../shared/utils/fetch';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';
import geocompleteReducer from '../../shared/components/Geocomplete/reducers/geocompleteReducer';
import withPage from '../../shared/page/withPage';

export class CreateListing extends React.PureComponent {
  static getInitialProps({ req }) {
    if (req) {
      return req.api.get(CREATE_LISTING_PREF_API_ENDPOINT)
        .then(response => response.agent_preferences);
    }

    return get(CREATE_LISTING_PREF_API_ENDPOINT)
      .then(response => response.agent_preferences);
  }

  render() {
    return (
      <CreateListingPageContentContainer />
    );
  }
}

export default withPage(CreateListing, { geocomplete: geocompleteReducer });
