import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import configureStore from '../redux/store/configureStore';

export function withRedux(WrappedComponent) {
  return class WithRedux extends React.PureComponent {
    constructor(props) {
      super(props);
      this.store = configureStore();
    }

    render() {
      return (
        <Provider store={this.store}>
          <WrappedComponent
            store={this.store}
            {...this.props}
          />
        </Provider>
      );
    }
  }

  WithRedux.displayName = `withRedux(${WrappedComponent.displayName || WrappedComponent.name})`;
}

export const withReduxPropTypes = {
  store: PropTypes.object.isRequired,
};
