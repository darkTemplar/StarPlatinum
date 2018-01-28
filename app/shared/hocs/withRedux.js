import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';

export default function withRedux(WrappedComponent) {
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
