import { Provider } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { bootstrap } from './actions/actionCreators';
import HomeAppContainer from './containers/HomeAppContainer';
import Layout from '../../shared/layout';
import configureStore from '../../shared/redux/store/configureStore';
import myReducer from './reducers/myReducer';

const propTypes = {
  bootstrapData: PropTypes.object,
};

const defaultProps = {
  bootstrapData: {},
};

export default class Home extends React.PureComponent {
  static getInitialProps ({ }) {
    return {
      bootstrapData: {
        foo: 3,
      },
    };
  }

  constructor(props, context) {
    super(props, context);

    this.store = configureStore();
    this.store.injectAll({
      myReducer: myReducer,
    })
    this.store.dispatch(bootstrap(this.props.bootstrapData));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout>
          <Link href="/about" >
            about
          </Link>
          <HomeAppContainer />
        </Layout>
      </Provider>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
