import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  ...withStylesPropTypes,
};

export function Modal({ styles, children, ...otherProps }) {
  return (
    <ReactModal
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      {...otherProps}
    >
      <div {...css(styles.modal)}>
        {children}
      </div>
    </ReactModal>
  );
}

Modal.propTypes = propTypes;

export default withStyles(({ responsive, unit }) => ({
  modal: {
    width: '100%',

    [responsive.mediumAndAbove]: {
      width: 63 * 8,
    },
  },
}))(Modal);
