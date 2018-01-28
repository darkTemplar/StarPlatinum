import { Provider } from 'react-redux';
import Link from 'next/link';
import React from 'react';
import withRedux from 'next-redux-wrapper';

import { bootstrap } from '../home/actions/actionCreators';
import Layout from '../../shared/layout';
import configureStore from '../../shared/redux/store/configureStore';

export default class About extends React.PureComponent {
  static getInitialProps () {
    return {
    };
  }

  constructor(props, context) {
    super(props, context);

    this.store = configureStore();
    this.store.injectAll({
      aboutReducer: () => ({
        bar: 2,
      }),
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <Link href="/home" >
            home
          </Link>
        </Layout>
      </Provider>
    );
  }
}
