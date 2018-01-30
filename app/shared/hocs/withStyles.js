import { StyleSheet, css as aphroditeCSS } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import _uniqueId from 'lodash/uniqueId';

import { unit, font } from '../styles/size';
import color from '../styles/color';
import isBrowser from '../utils/isBrowser';
import { APHRODITE_DATA_KEY } from '../constants';

let isHydrated = false;

// hydration if haven't yet on the client
if (isBrowser() && !isHydrated) {
  const aphroditeClasses = window[APHRODITE_DATA_KEY] || [];
  StyleSheet.rehydrate(aphroditeClasses);
  isHydrated = true;
}

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
  // This handles passing in plain objects instead of StyleSheet generated objects, relies on inernal implementation
  // of aphrodite, which is okay, just need to be careful when performing aphrodite upgrades or find a more robust
  // way to check for non aphrodite objects
  const aphroditeCssProperties = Array.prototype.map.call(arguments, (arg) => {
    if (!arg._name) {
      const id = _uniqueId('css');

      return StyleSheet.create({ id: arg }).id;
    }

    return arg;
  });

  return {
    className: aphroditeCSS.apply(null, aphroditeCssProperties),
  };
}

export const withStylesPropTypes = {
  styles: PropTypes.object.isRequired,
};
