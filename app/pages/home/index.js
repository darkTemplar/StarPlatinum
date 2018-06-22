import React from 'react';

import withPage from '../../shared/page/withPage';

export class Home extends React.PureComponent {
  static getInitialProps() {
    return {
      bootstrapData: {
        foo: 3,
      },
    };
  }

  render() {
    return (
      <div>Home Page</div>
    );
  }
}

export default withPage(Home);
