import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylePropTypes }from '../hocs/withStyles';

const propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  children: PropTypes.node.isRequired,
  bold: PropTypes.bool,
  ...withStylePropTypes,
};

const defaultProps = {
  bold: false,
};

const levelToComponentMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

export function Title({
  level,
  children,
  bold,
  styles,
}) {
  const Component = levelToComponentMap[level];

  return (
    <Component
      {...css(
        styles.default,
        bold && styles.bold,
        level === 1 && styles.level1,
        level === 2 && styles.level2,
        level === 3 && styles.level3,
        level === 4 && styles.level4,
      )}
    >
      {children}
    </Component>
  );
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default withStyles(({ font, color }) => ({
  bold: {
    fontWeight: 'bold',
  },

  default: {
    margin: 0,
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

  level4: {
    fontSize: font.h4,
  },
}), { pureComponent: true })(Title);
