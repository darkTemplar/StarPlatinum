import { connect } from 'react-redux';

import { publishListing } from '../actions/actionCreators';
import ListingPreviewActions from '../components/ListingPreviewActions';

export default connect(state => ({
  isPublishing: state.previewListing.isPublishing,
  publishError: state.previewListing.publishError,
}), { publishListing })(ListingPreviewActions);
