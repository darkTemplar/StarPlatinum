import React from 'react';

import CreateListingApp from './app';

export default class CreateListing extends React.PureComponent {
  static getInitialProps() {
    return CreateListingApp.getInitialProps.apply(CreateListingApp, Array.prototype.slice.call(arguments));
  }

  render() {
    return (
      <CreateListingApp {...this.props} />
    );
  }
}
