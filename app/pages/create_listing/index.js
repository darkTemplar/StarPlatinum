import React from 'react';

import { withRedux } from '../../shared/hocs/withRedux';
import LayoutContainer from '../../shared/layout/LayoutContainer';
import CreateListingPageContentContainer from './containers/CreateListingPageContentContainer';

export class CreateListing extends React.PureComponent {
  static getInitialProps() {
    return {

    };
  }

  render() {
    return (
      <LayoutContainer>
        <CreateListingPageContentContainer />
      </LayoutContainer>
    );
  }
}

export default withRedux(CreateListing);

