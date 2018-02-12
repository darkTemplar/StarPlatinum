import React from 'react';

import { withRedux } from '../../shared/hocs/withRedux';
import Layout from '../../shared/layout';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';

export class CreateListing extends React.PureComponent {
  static getInitialProps() {
    return {

    };
  }

  render() {
    return (
      <Layout>
        <CreateListingPageContentContainer />
      </Layout>
    );
  }
}

export default withRedux(CreateListing);

