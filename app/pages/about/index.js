import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../shared/layout';
import withRedux from '../../shared/hocs/withRedux';

const propTypes = {
  store: PropTypes.object.isRequired,
};

export class About extends React.PureComponent {
  static getInitialProps () {
    return {
    };
  }

  constructor(props) {
    super(props);
    const { store } = this.props;

    store.injectAll({
      aboutReducer: () => ({
        bar: 2,
      }),
    })
  }

  render() {
    return (
      <Layout>
        <Link href="/home" >
          home
        </Link>
      </Layout>
    );
  }
}

About.propTypes = propTypes;

export default withRedux(About);
