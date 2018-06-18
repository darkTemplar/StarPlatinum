import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import { ESC_KEYCODE } from '../../constants/keycode';
import { MODAL_SLOT_DOCUMENT_ID } from '../../layout';
import { css, withStyles, withStylesPropTypes } from '../../hocs/withStyles';
import CloseIcon from '../icons/CloseIcon';
import EventListener from '../EventListener';
import IconButton from '../IconButton';
import OutsideClickHandler from '../OutsideClickHandler';
import Spacing from '../Spacing';
import noop from '../../utils/noop';

const propTypes = forbidExtraProps({
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  footer: PropTypes.node,
  closeOnEscape: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  ...withStylesPropTypes,
});

const defaultProps = {
  footer: null,
  isOpen: false,
  closeOnEscape: true,
  closeOnOutsideClick: true,
};

export class UnstyledModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(e) {
    const { keyCode } = e;

    if (keyCode === ESC_KEYCODE) {
      this.props.onClose();
    }
  }

  render() {
    const { styles, onClose, closeOnEscape, footer, children, ...otherProps } = this.props;

    return (
      <ReactModal
        parentSelector={() => document.getElementById(MODAL_SLOT_DOCUMENT_ID)}
        className={css(styles.modal).className}
        overlayClassName={css(styles.overlay).className}
        {...otherProps}
      >
        <OutsideClickHandler onOutsideClick={closeOnEscape ? onClose : noop}>
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
        </OutsideClickHandler>
        {closeOnEscape && (
          <EventListener
            target="document"
            eventName="keyup"
            callback={this.onKeyUp}
          />
        )}
      </ReactModal>
    );
  }
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
