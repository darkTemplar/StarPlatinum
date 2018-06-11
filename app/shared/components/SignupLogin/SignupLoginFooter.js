import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { MODES } from './constants';
import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import Link from '../Link';
import Spacing from '../Spacing';
import Text from '../Text';

const propTypes = forbidExtraProps({
  mode: PropTypes.oneOf(Object.values(MODES)).isRequired,
  switchSignupLoginMode: PropTypes.func.isRequired,
  ...withStylesPropTypes,
});

export function UnstyledSignupLoginFooter({
  mode,
  switchSignupLoginMode,
  styles,
}) {
  const link = mode === MODES.SIGNUP ? 'Log in' : 'Sign up';
  const label = mode === MODES.SIGNUP ? 'Already have an account?' : 'Don\'t have an account?';

  return (
    <div {...css(styles.footer)}>
      <Text inline>{label}</Text>
      <Spacing left={1} inline>
        <Link onPress={switchSignupLoginMode}>
          <Text inline>{link}</Text>
        </Link>
      </Spacing>
    </div>
  );
}

UnstyledSignupLoginFooter.propTypes = propTypes;

export default withStyles(({ unit }) => ({
  footer: {
    padding: `${2 * unit}px ${3 * unit}px`,
    textAlign: 'center',
  },
}))(UnstyledSignupLoginFooter);
