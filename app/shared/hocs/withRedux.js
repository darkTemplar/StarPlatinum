import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import configureStore from '../redux/stores/configureStore';
import { CURRENT_USER_DATA_KEY } from '../constants';
import UserShape from '../shapes/UserShape';

function getCurrentUserClientSide() {
  if (typeof window !== 'undefined') {
    return window[CURRENT_USER_DATA_KEY];
  }

  return null;
}

export function withRedux(WrappedComponent) {
  const propTypes = {
    user: UserShape,
  };
  const defaultProps = {
    user: null,
  };

  class WithRedux extends React.PureComponent {
    // THIS MUST BE MANUALLY CALLED BY PAGE USING THIS
    static getInitialProps({ req }) {
      if (req) {
        // server logic
        return {
          user: req.user,
        };
      }

      // this should fire on page navigation on FE
      return {
        user: getCurrentUserClientSide(),
      };
    }

    constructor(props) {
      super(props);
      this.store = configureStore({
        user: this.props.user || getCurrentUserClientSide(),
      });
    }

    render() {
      const { user, ...rest } = this.props;

      return (
        <Provider store={this.store}>
          <WrappedComponent
            store={this.store}
            {...rest}
          />
        </Provider>
      );
    }
  }

  WithRedux.propTypes = propTypes;
  WithRedux.defaultProps = defaultProps;
  WithRedux.displayName = `withRedux(${WrappedComponent.displayName || WrappedComponent.name})`;
  hoistNonReactStatics(WithRedux, WrappedComponent);

  return WithRedux;
}

export const withReduxPropTypes = {
  store: PropTypes.object.isRequired,
};
