import React from 'react';

import CreateListingApp from './app';

export default class CreateListing extends React.PureComponent {
  static getInitialProps() {
    return {};
  }

  render() {
    return (
      <CreateListingApp {...this.props} />
    );
  }
}
