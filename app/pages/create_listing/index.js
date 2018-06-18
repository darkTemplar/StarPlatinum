import React from 'react';

import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';
import geocompleteReducer from '../../shared/components/Geocomplete/reducers/geocompleteReducer';
import withPage from '../../shared/page/withPage';

export function CreateListing() {
  return <CreateListingPageContentContainer />;
}

export default withPage(CreateListing, { geocomplete: geocompleteReducer });
