import React from 'react';

import { NAVBAR_WIDTH } from '../constants/ui';
import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import Link from '../components/Link';
import Text from '../components/Text';

const propTypes = {
  ...withStylesPropTypes,
};

export function UnstyledHeader({
  styles,
}) {
  return (
    <nav {...css(styles.header)}>
      <Link href="/">
        <div {...css(styles.logo)}>
          <Text size="xl" inverse>OfferDate</Text>
        </div>
      </Link>
    </nav>
  );
}

UnstyledHeader.propTypes = propTypes;

export default withStyles(({ color, unit }) => ({
  logo: {
    textAlign: 'center',
    background: color.core.primary,
    display: 'inline-block',
    padding: 3 * unit,
    width: NAVBAR_WIDTH,
  },
}), { pureComponent: true })(UnstyledHeader);
