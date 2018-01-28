import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { bootstrap } from './actions/actionCreators';
import HomeAppContainer from './containers/HomeAppContainer';
import Layout from '../../shared/layout';
import myReducer from './reducers/myReducer';
import withRedux from '../../shared/hocs/withRedux';

const propTypes = {
  store: PropTypes.object.isRequired,
  bootstrapData: PropTypes.object,
};

const defaultProps = {
  bootstrapData: {},
};

export class Home extends React.PureComponent {
  static getInitialProps ({ }) {
    return {
      bootstrapData: {
        foo: 3,
      },
    };
  }

  constructor(props) {
    super(props);
    const { store, bootstrapData } = this.props;

    store.injectAll({
      myReducer: myReducer,
    })
    store.dispatch(bootstrap(bootstrapData));
  }

  render() {
    return (
      <Layout>
        <Link href="/about" >
          about
        </Link>
        <HomeAppContainer />
      </Layout>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default withRedux(Home);
