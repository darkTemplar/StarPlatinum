import { StyleSheet, css as aphroditeCSS } from 'aphrodite';
import React from 'react';
import _get from 'lodash/get';

import { unit } from '../styles/size';
import color from '../styles/color';

/**
 * HOC to pass down styling options
 * @param  {[type]} styles  [description]
 * @param  {[type]} options [description]
 * @param {[type]}  options.pureComponent [description]
 * @return {[type]}         [description]
 */
export function withStyles(styles, options = {}) {
  const _styles = StyleSheet.create(styles({
    unit,
    color,
  }));

  return function _withStyles(WrappedComponent) {
    const pureComponent = _get(options, 'pureComponent', false);
    const ParentReactClass = pureComponent ? React.PureComponent : React.Component;

    return class WithStyles extends ParentReactClass {
      render() {
        return (
          <WrappedComponent
            styles={_styles}
            {...this.props}
          />
        );
      }
    }

    WithStyles.displayName = `withStyles(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  }
}

export function css(stylesObject) {
  return {
    className: aphroditeCSS(stylesObject),
  };
}
