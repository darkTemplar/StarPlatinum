import PropTypes from 'prop-types';
import React from 'react';

import { css } from '../hocs/withStyles';
import { unit } from '../styles/size';

const propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  inline: PropTypes.bool,
};

const defaultProps = {
  inline: false,
  top: null,
  right: null,
  bottom: null,
  left: null,
};

function getMarginProperty(marginKey, spacing) {
  if (spacing) {
    return { [marginKey]: spacing * unit };
  }

  return {};
}

export default function Spacing({
  inline,
  top,
  right,
  bottom,
  left,
  children,
}) {
  const Component = inline ? 'span' : 'div';
  const cssProperties = {
    ...getMarginProperty('marginTop', top),
    ...getMarginProperty('marginRight', right),
    ...getMarginProperty('marginBottom', bottom),
    ...getMarginProperty('marginLeft', left),
  };

  return (
    <Component {...css(cssProperties)}>
      {children}
    </Component>
  );
}

Spacing.propTypes = propTypes;
Spacing.defaultProps = defaultProps;
