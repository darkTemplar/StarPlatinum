import Link from 'next/link';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../shared/hocs/withStyles';
import { withRedux, withReduxPropTypes } from '../../shared/hocs/withRedux';
import Layout from '../../shared/layout';

const propTypes = {
  ...withReduxPropTypes,
  ...withStylesPropTypes,
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
        <div {...css(this.props.styles.test)}>
        </div>
      </Layout>
    );
  }
}

About.propTypes = propTypes;

export default withStyles(({ color }) => ({
  test: {
    height: 200,
    backgroundColor: color.core.blueberry,
  },
}), { pureComponent: true })(withRedux(About));
