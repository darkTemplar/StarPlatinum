import PropTypes from 'prop-types';
import React from 'react';

import { withRedux, withReduxPropTypes } from '../hocs/withRedux';
import LayoutContainer from '../layout/LayoutContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
  reducers: PropTypes.object,
  ...withReduxPropTypes,
};

const defaultProps = {
  reducers: {},
};

export class PageContentWithReduxAndAuth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.store.injectAll(this.props.reducers);
  }

  render() {
    const { children } = this.props;

    return (
      <LayoutContainer>
        {children}
      </LayoutContainer>
    );
  }
}

PageContentWithReduxAndAuth.propTypes = propTypes;
PageContentWithReduxAndAuth.defaultProps = defaultProps;

export default withRedux(PageContentWithReduxAndAuth);
