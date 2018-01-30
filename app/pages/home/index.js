import { Row, Col } from 'react-grid-system';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { bootstrap } from './actions/actionCreators';
import { css, withStyles, withStylesPropTypes } from '../../shared/hocs/withStyles';
import { withRedux, withReduxPropTypes } from '../../shared/hocs/withRedux';
import HomeAppContainer from './containers/HomeAppContainer';
import Input from '../../shared/components/Input';
import Layout from '../../shared/layout';
import Spacing from '../../shared/components/Spacing';
import myReducer from './reducers/myReducer';

const propTypes = {
  bootstrapData: PropTypes.object,
  ...withReduxPropTypes,
  ...withStylesPropTypes,
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
        <div {...css(this.props.styles.test, { color: 'blue' })}>
          TEST TEST CSS THIS SHOULD BE 16 px from top
        </div>
        <Row>
          <Col md={4} offset={{ md: 4 }}>
            COLUMN LIKE BOOTSTRAP
          </Col>
        </Row>
        <Spacing top={4} left={2}>
          TEST SPACING COMPONENT
        </Spacing>
        <Input
          type="text"
          id="foobar"
          value="abcde"
          label="small input"
          onChange={(value) => { console.log(value); }}
        />
        <Input
          type="text"
          id="foobar2"
          value="abcde"
          label="large input"
          onChange={(value) => { console.log(value); }}
          lg
        />
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
