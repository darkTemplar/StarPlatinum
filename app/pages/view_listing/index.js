import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';
import _omit from 'lodash/omit';

import { LISTING_API } from './constants/api';
import { get } from '../../shared/utils/fetch';
import Card from '../../shared/components/Card';
import ListingShape from './shapes/ListingShape';
import PropertyShape from './shapes/PropertyShape';
import Title from '../../shared/components/Title';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape.isRequired,
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
    const { property: { route } } = this.props;

    return (
      <div>
        <Card>
          <Title level={1}>
            {route}
          </Title>
        </Card>
      </div>
    );
  }
}

ViewListing.propTypes = propTypes;

export default withPage(ViewListing);
