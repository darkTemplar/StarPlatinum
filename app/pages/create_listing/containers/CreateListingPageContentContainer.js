import { connect } from 'react-redux';

import { createListing } from '../actions/actionCreators';
import CreateListingPageContent from '../components/CreateListingPageContent';

export default connect(state => ({
  createdListingId: state.createListing.createdListingId,
}), { createListing })(CreateListingPageContent);
