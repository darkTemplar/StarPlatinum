import React from 'react';

import { withRedux } from '../../shared/hocs/withRedux';
import Layout from '../../shared/layout';
import CreateListingPageContent from './components/CreateListingPageContent';

export class CreateListing extends React.PureComponent {
  static getInitialProps() {
    return {

    };
  }

  render() {
    return (
      <Layout>
        <CreateListingPageContent />
      </Layout>
    );
  }
}

export default withRedux(CreateListing);

