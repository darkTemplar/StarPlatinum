import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import { withNavbarItemPropTypes } from './NavbarItemShape';
import Link from '../Link';
import Spacing from '../Spacing';
import Text from '../Text';
import { core as coreColors } from '../../styles/color';

const propTypes = {
  ...withNavbarItemPropTypes,
  ...withStylesPropTypes,
};

export function UnstyledNavbarItem({
  id,
  active,
  icon: IconComponent,
  label,
  url,
  styles,
}) {
  return (
    <div {...css(styles.navbarItem, active && styles.active)}>
      <Link href={url} id={id}>
        <Spacing bottom={2}>
          <IconComponent size={24} color={active ? coreColors.primary : undefined} />
        </Spacing>
        <Text size="lg">
          {label}
        </Text>
      </Link>
    </div>
  );
}

UnstyledNavbarItem.propTypes = propTypes;

export default withStyles(({ unit, color }) => ({
  navbarItem: {
    textAlign: 'center',
    padding: 2 * unit,
  },

  active: {
    borderRight: `3px solid ${color.core.primary}`,
  },
}))(UnstyledNavbarItem);
