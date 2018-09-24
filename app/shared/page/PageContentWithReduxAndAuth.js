import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_ITEMS } from '../layout/index';
import { withRedux, withReduxPropTypes } from '../hocs/withRedux';
import LayoutContainer from '../layout/LayoutContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
  reducers: PropTypes.object,
  navId: PropTypes.oneOf(Object.values(NAVBAR_ITEMS)),
  ...withReduxPropTypes,
};

const defaultProps = {
  navId: null,
  reducers: {},
};

export class PageContentWithReduxAndAuth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.store.injectAll(this.props.reducers);
  }

  render() {
    const { children, navId } = this.props;

    return (
      <LayoutContainer currentNavId={navId} >
        {children}
      </LayoutContainer>
    );
  }
}

PageContentWithReduxAndAuth.propTypes = propTypes;
PageContentWithReduxAndAuth.defaultProps = defaultProps;

export default withRedux(PageContentWithReduxAndAuth);
