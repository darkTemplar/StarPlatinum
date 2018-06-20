import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { LISTING_API } from './constants/api';
import { get } from '../../shared/utils/fetch';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({

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
    return (
      <div>
        Hello World
      </div>
    );
  }
}

ViewListing.propTypes = propTypes;

export default withPage(ViewListing);
