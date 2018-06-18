import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import PageContentWithReduxAndAuth from './PageContentWithReduxAndAuth';

export default function withPage(WrappedComponent, reducers) {
  class WithPage extends React.PureComponent {
    static async getInitialProps(...args) {
      const props = PageContentWithReduxAndAuth.getInitialProps.apply(PageContentWithReduxAndAuth, args);

      if (WrappedComponent.getInitialProps) {
        Object.assign(props, await WrappedComponent.getInitialProps(...args));
      }

      return props;
    }

    render() {
      const {
        url,
        ...rest
      } = this.props;

      return (
        <PageContentWithReduxAndAuth reducers={reducers} {...rest}>
          <WrappedComponent {...rest} />
        </PageContentWithReduxAndAuth>
      );
    }
  }

  WithPage.displayName = `withPage(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  // no hoisting here to avoid overriding getInitialProps

  return WithPage;
}
