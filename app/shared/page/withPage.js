import React from 'react';
import _omit from 'lodash/omit';

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
        // don't pass url down
        url,
        ...rest
      } = this.props;

      return (
        <PageContentWithReduxAndAuth reducers={reducers} {...rest}>
          <WrappedComponent {..._omit(rest, ['user'])} />
        </PageContentWithReduxAndAuth>
      );
    }
  }

  WithPage.displayName = `withPage(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  // no hoisting here to avoid overriding getInitialProps

  return WithPage;
}
