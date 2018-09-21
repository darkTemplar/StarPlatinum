import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Button from '../../../shared/components/Button';
import Link from '../../../shared/components/Link';
import Modal from '../../../shared/components/Modal';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';
import Title from '../../../shared/components/Title';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
});

export class NewlyPublishListingModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onPressShareListing = this.onPressShareListing.bind(this);
    this.state = {
      isVisible: false,
    };
  }

  onPressShareListing() {
    console.log('noop');
  }

  componentDidMount() {
    this.setState({ isVisible: true });
  }

  onClose() {
    this.setState({ isVisible: false });
  }

  render() {
    const { isVisible } = this.state;
    const { styles } = this.props;

    return (
      <Modal
        isOpen={isVisible}
        onClose={this.onClose}
      >
        <div {...css(styles.modalContent)}>
          <Spacing bottom={1}>
            <Title level={2}>
              Your listing has been published!
            </Title>
          </Spacing>
          <Spacing bottom={2}>
            <Text>
              Get the word out and invite people to your listing. Something something something two lines
            </Text>
          </Spacing>
          <Spacing bottom={3}>
            <Button inline primary onPress={this.onPressShareListing}>
              Share Listing
            </Button>
          </Spacing>
          <Link onPress={this.onClose}>
            VIEW MY LISTINGS
          </Link>
        </div>
      </Modal>
    );
  }
}

NewlyPublishListingModal.propTypes = propTypes;

export default withStyles(() => ({
  modalContent: {
    textAlign: 'center',
  },
}))(NewlyPublishListingModal);
