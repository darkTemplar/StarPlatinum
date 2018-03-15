import PropTypes from 'prop-types';
import React from 'react';

import { css, withStyles, withStylesPropTypes } from '../hocs/withStyles';

const propTypes = {
  children: PropTypes.node.isRequired,
  before: PropTypes.node,
  after: PropTypes.node,
  align: PropTypes.oneOf(['bottom', 'top', 'middle']),
  ...withStylesPropTypes,
};

const defaultProps = {
  before: null,
  after: null,
  align: 'middle',
};

export function UnstyledFlexBar({
  children,
  before,
  after,
  align,
  styles,
}) {
  return (
    <div
      {...css(
        styles.row,
        align === 'top' && styles.top,
        align === 'bottom' && styles.bottom,
        align === 'middle' && styles.middle,
      )}
    >
      {before && (
        <div {...css(styles.col)}>
          {before}
        </div>
      )}
      <div {...css(styles.col, styles.fullCol)}>
        {children}
      </div>
      {after && (
        <div {...css(styles.col)}>
          {after}
        </div>
      )}
    </div>
  );
}

UnstyledFlexBar.propTypes = propTypes;
UnstyledFlexBar.defaultProps = defaultProps;

export default withStyles(() => ({
  row: {
    display: 'table-row',
  },

  col: {
    display: 'table-cell',
  },

  fullCol: {
    width: '100%',
  },

}))(UnstyledFlexBar);
