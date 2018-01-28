import { StyleSheet, css as aphroditeCSS } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';

import { unit, font } from '../styles/size';
import color from '../styles/color';
import isBrowser from '../utils/isBrowser';
import { APHRODITE_DATA_KEY } from '../constants';

let isHydrated = false;

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
    font,
  }));

  return function _withStyles(WrappedComponent) {
    // hydration if haven't yet
    if (isBrowser() && !isHydrated) {
      const aphroditeClasses = window[APHRODITE_DATA_KEY] || [];
      StyleSheet.rehydrate(aphroditeClasses);
      isHydrated = true;
    }

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

export function css() {
  return {
    className: aphroditeCSS.apply(null, arguments),
  };
}

export const withStylesPropTypes = {
  styles: PropTypes.object.isRequired,
};
