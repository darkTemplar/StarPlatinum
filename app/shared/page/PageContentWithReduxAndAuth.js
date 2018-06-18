import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { withRedux, withReduxPropTypes } from '../hocs/withRedux';
import LayoutContainer from '../layout/LayoutContainer';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  reducers: PropTypes.object,
  ...withReduxPropTypes,
});

const defaultProps = {
  reducers: {},
};

export class PurePageContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.store.injectAll(this.props.reducers);
  }

  render() {
    const { children, store } = this.props;

    return (
      <LayoutContainer>
        {React.cloneElement(children, { store })}
      </LayoutContainer>
    );
  }
}

PurePageContent.propTypes = propTypes;
PurePageContent.defaultProps = defaultProps;

export default withRedux(PurePageContent);
