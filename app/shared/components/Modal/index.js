import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { MODAL_SLOT_DOCUMENT_ID } from '../../layout';
import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import Button from '../Button';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  ...withStylesPropTypes,
};

export function Modal({ styles,onClose, children, ...otherProps }) {
  return (
    <ReactModal
      parentSelector={() => document.getElementById(MODAL_SLOT_DOCUMENT_ID)}
      className={css(styles.modal).className}
      {...otherProps}
    >
      <div {...css(styles.modal)}>
        <div>
          <Button onPress={onClose}>
            close
          </Button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
}

Modal.propTypes = propTypes;

export default withStyles(({ responsive, unit }) => ({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 2 * unit,

    [responsive.mediumAndAbove]: {
      width: 63 * unit,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  },
}))(Modal);
