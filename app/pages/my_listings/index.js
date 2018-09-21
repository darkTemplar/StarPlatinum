import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import url from 'url';

import NewlyPublishListingModal from './components/NewlyPublishListingModal';
import withPage from '../../shared/page/withPage';

const propTypes = forbidExtraProps({
  newlyPublishListingId: PropTypes.number,
});

const defaultProps = {
  newlyPublishListingId: null,
};

function getInitialProps(query) {
  const { npl } = query;

  return {
    newlyPublishListingId: npl ? parseInt(npl, 10) : undefined,
  };
}

class MyListings extends React.PureComponent {
  static getInitialProps({ req, asPath }) {
    if (req) {
      return getInitialProps(req.query);
    }

    const parsedUrl = url.parse(asPath, true);

    return getInitialProps(parsedUrl.query);
  }

  render() {
    const { newlyPublishListingId } = this.props;

    return (
      <div>
        {newlyPublishListingId && <NewlyPublishListingModal />}
      </div>
    );
  }
}

MyListings.propTypes = propTypes;
MyListings.defaultProps = defaultProps;

export default withPage(MyListings, {
});
