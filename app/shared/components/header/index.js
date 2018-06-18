import PropTypes from 'prop-types';
import React from 'react';

import { NAVBAR_WIDTH } from '../../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import Button from '../Button';
import Link from '../Link';
import Text from '../Text';
import UserShape from '../../shapes/UserShape';

const propTypes = {
  toggleNavExpand: PropTypes.func.isRequired,
  currentUser: UserShape,
  showSignup: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  ...withStylesPropTypes,
};

const defaultProps = {
  currentUser: null,
};

export function UnstyledHeader({
  toggleNavExpand,
  currentUser,
  showSignup,
  showLogin,
  logout,
  styles,
}) {
  return (
    <nav {...css(styles.header)}>
      <div {...css(styles.mobileControl)}>
        <Button onPress={toggleNavExpand}>
          X
        </Button>
      </div>
      <Link href="/">
        <div {...css(styles.leftLogo)}>
          <Text size="xl" inverse>OfferDate</Text>
        </div>
      </Link>
      <div {...css(styles.pullRight)}>
        {!currentUser && (
          <div>
            <Button onPress={showLogin}>
              Log in
            </Button>
            <Button onPress={showSignup}>
              Signup
            </Button>
          </div>
        )}
        {currentUser && (
          <Button onPress={logout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

UnstyledHeader.propTypes = propTypes;
UnstyledHeader.defaultProps = defaultProps;

export default withStyles(({ color, unit, responsive }) => ({
  header: {
    width: '100%',
    background: color.greys.white,
  },

  pullRight: {
    float: 'right',
  },

  mobileControl: {
    display: 'block',

    [responsive.mediumAndAbove]: {
      display: 'none',
    },
  },

  leftLogo: {
    display: 'none',
    textAlign: 'center',
    background: color.core.primary,
    padding: 3 * unit,
    width: NAVBAR_WIDTH,

    [responsive.mediumAndAbove]: {
      display: 'inline-block',
    },
  },
}), { pureComponent: true })(UnstyledHeader);
