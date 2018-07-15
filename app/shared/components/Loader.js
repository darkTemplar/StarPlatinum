import {
  forbidExtraProps,
  mutuallyExclusiveTrueProps
} from 'airbnb-prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const blinkKeyFrames = {
  '0%': {
    opacity: .2,
  },
  '20%': {
    opacity: 1,
  },
  '100%': {
    opacity: .2,
  },
};

const propTypes = forbidExtraProps({
  sm: mutuallyExclusiveTrueProps('sm', 'md', 'lg'),
  md: mutuallyExclusiveTrueProps('sm', 'md', 'lg'),
  lg: mutuallyExclusiveTrueProps('sm', 'md', 'lg'),
  ...withStylesPropTypes,
});

const defaultProps = {
  sm: false,
  md: true,
  lg: false,
};

export function Loader({ styles, sm, md, lg }) {
  return (
    <div {...css(styles.container)}>
      <div {...css(styles.dot, sm && styles.dotSm, md && styles.dotMd, lg && styles.dotLg)} />
      <div {...css(styles.dot, sm && styles.dotSm, md && styles.dotMd, lg && styles.dotLg, styles.dot2)} />
      <div {...css(styles.dot, sm && styles.dotSm, md && styles.dotMd, lg && styles.dotLg, styles.dot3)} />
    </div>
  );
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default withStyles(({ color, unit }) => ({
  dot: {
    animationName: [blinkKeyFrames],
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    borderRadius: '50%',
    background: color.core.white,
    display: 'inline-block',
    marginRight: unit,

    ':last-child': {
      marginRight: 0,
    },
  },

  dotSm: {
    width: unit / 2,
    height: unit / 2,
  },

  dotMd: {
    width: unit,
    height: unit,
  },

  dotLg: {
    width: 1.5 * unit,
    height: 1.5 * unit,
  },

  dot2: {
    animationDelay: '0.2s',
  },

  dot3: {
    animationDelay: '0.4s',
  },
}))(Loader);