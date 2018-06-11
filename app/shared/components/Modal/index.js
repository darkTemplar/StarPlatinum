import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { MODAL_SLOT_DOCUMENT_ID } from '../../layout';
import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import CloseIcon from '../icons/CloseIcon';
import IconButton from '../IconButton';
import Spacing from '../Spacing';

const propTypes = forbidExtraProps({
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  footer: PropTypes.node,
  ...withStylesPropTypes,
});

const defaultProps = {
  footer: null,
};

export function UnstyledModal({ styles, onClose, footer, children, ...otherProps }) {
  return (
    <ReactModal
      parentSelector={() => document.getElementById(MODAL_SLOT_DOCUMENT_ID)}
      className={css(styles.modal).className}
      overlayClassName={css(styles.overlay).className}
      {...otherProps}
    >
      <div {...css(styles.modal)}>
        <div {...css(styles.modalBody)}>
          <div {...css(styles.closeButtonContainer)}>
            <div {...css(styles.closeButton)}>
              <Spacing bottom={1}>
                <IconButton onPress={onClose} icon={<CloseIcon size={16} />} />
              </Spacing>
            </div>
          </div>
          {children}
        </div>
        {footer && (
          <div {...css(styles.modalFooter)}>
            {footer}
          </div>
        )}
      </div>
    </ReactModal>
  );
}

UnstyledModal.propTypes = propTypes;
UnstyledModal.defaultProps = defaultProps;

export default withStyles(({ responsive, unit, color }) => ({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: color.core.white,

    [responsive.mediumAndAbove]: {
      width: 63 * unit,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: unit / 2,
    },

    ':focus': {
      outline: 'none',
    },
  },

  modalBody: {
    padding: 3 * unit,
  },

  modalFooter: {
    background: color.greys.wind,
  },

  overlay: {
    [responsive.mediumAndAbove]: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.36)',
    },
  },

  closeButton: {
    float: 'right',
  },

  closeButtonContainer: {
    overflow: 'hidden',
  },
}))(UnstyledModal);
