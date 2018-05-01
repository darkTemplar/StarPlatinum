import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import configureStore from '../redux/stores/configureStore';

export function withRedux(WrappedComponent) {
  class WithRedux extends React.PureComponent {
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
  };

  WithRedux.displayName = `withRedux(${WrappedComponent.displayName || WrappedComponent.name})`;
  hoistNonReactStatics(WithRedux, WrappedComponent);

  return WithRedux;
}

export const withReduxPropTypes = {
  store: PropTypes.object.isRequired,
};
