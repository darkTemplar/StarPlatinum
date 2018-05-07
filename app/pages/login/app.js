import React from 'react';

import { withRedux, withReduxPropTypes } from '../../shared/hocs/withRedux';
import LayoutContainer from '../../shared/layout/LayoutContainer';
import LoginPageContent from './components/LoginPageContent';

const propTypes = {
  ...withReduxPropTypes,
};

export function BaseLoginApp() {
  return (
    <LayoutContainer>
      <LoginPageContent />
    </LayoutContainer>
  );
}

BaseLoginApp.propTypes = propTypes;

export default withRedux(BaseLoginApp);
