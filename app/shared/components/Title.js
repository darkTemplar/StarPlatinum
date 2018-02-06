import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylePropTypes } from '../hocs/withStyles';

const propTypes = {
  level: PropTypes.oneOf([1, 2, 3]).isRequired,
  children: PropTypes.node.isRequired,
  jumbo: PropTypes.bool,
  ...withStylePropTypes,
};

const defaultProps = {
  jumbo: false,
};

const levelToComponentMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
};

export function Title({
  level,
  children,
  styles,
  jumbo,
}) {
  const Component = jumbo ? 'h1' : levelToComponentMap[level];

  return (
    <Component
      {...css(
        styles.default,
        level === 1 && styles.level1  ,
        level === 2 && styles.level2,
        level === 3 && styles.level3,
        jumbo && styles.jumbo,
      )}
    >
      {children}
    </Component>
  );
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default withStyles(({ font, fontFamily }) => ({
  default: {
    margin: 0,
    fontFamily: fontFamily.bold,
  },

  jumbo: {
    fontSize: font.jumbo,
    fontFamily: fontFamily.jumbo,
  },

  level1: {
    fontSize: font.h1,
  },

  level2: {
    fontSize: font.h2,
  },

  level3: {
    fontSize: font.h3,
  },
}), { pureComponent: true })(Title);
