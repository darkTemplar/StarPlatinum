import React from 'react';
import { Row } from 'react-grid-system';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';
import Link from '../components/Link';
import Text from '../components/Text';

const propTypes = {
  ...withStylesPropTypes,
};

export function Header({
  styles,
}) {
  return (
    <Row>
      <nav {...css(styles.header)}>
        <Link href="/">
          <div {...css(styles.logo)}>
            <Text size="lg" inverse>OfferDate</Text>
          </div>
        </Link>
      </nav>
    </Row>
  );
}

Header.propTypes = propTypes;

export default withStyles(({ color, unit }) => ({
  logo: {
    background: color.core.primary,
    display: 'inline-block',
    padding: 3 * unit,
  },
}), { pureComponent: true })(Header);
