import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

import { bootstrap } from './actions/actionCreators';
import { css, withStyles } from '../../shared/hocs/withStyles';
import HomeAppContainer from './containers/HomeAppContainer';
import Layout from '../../shared/layout';
import myReducer from './reducers/myReducer';
import withRedux from '../../shared/hocs/withRedux';

const propTypes = {
  store: PropTypes.object.isRequired,
  bootstrapData: PropTypes.object,
  styles: PropTypes.object.isRequired,
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
        <div {...css(this.props.styles.test)}>
          TEST TEST CSS THIS SHOULD BE 16 px from top
        </div>
        <Row>
          <Col md={4} offset={{ md: 4 }}>
            COLUMN LIKE BOOTSTRAP
          </Col>
        </Row>
        <HomeAppContainer />
      </Layout>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default withStyles(({ unit, color }) => ({
  test: {
    marginTop: 2 * unit,
  },
}), { pureComponent: true })(withRedux(Home));
