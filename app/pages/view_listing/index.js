import React from 'react';

import withPage from '../../shared/page/withPage';

export class ViewListing extends React.PureComponent {
  static getInitialProps({ req }) {
    if (req) {
      
    }
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default withPage(ViewListing);
