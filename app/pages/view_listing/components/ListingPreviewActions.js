import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import FlexBar from '../../../shared/components/FlexBar';
import ListingShape from '../shapes/ListingShape';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';

const propTypes = forbidExtraProps({
  isPublishing: PropTypes.bool,
  publishError: PropTypes.string,
  listing: ListingShape.isRequired,
  publishListing: PropTypes.func.isRequired,
  ...withStylesPropTypes,
});

const defaultProps = {
  isPublishing: false,
  publishError: '',
};

export class UnstyledListingPreviewActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPressEdit = this.onPressEdit.bind(this);
    this.onPressPublish = this.onPressPublish.bind(this);
  }

  componentWillReceiveProps({ isPublishing, publishError }) {
    if (typeof window !== 'undefined' && this.props.isPublishing && !isPublishing && !publishError) {
      const { listing: { id } } = this.props;

      Router.push(`/my_listings?npl=${id}`, `/my-listings?npl=${id}`);
    }
  }

  onPressEdit() {
    const {
      listing: {
        id,
      },
    } = this.props;

    Router.push(`/create_listing?listingId=${id}`, `/listings/${id}/edit`);
  }

  onPressPublish() {
    const {
      listing: {
        id,
      },
      publishListing,
    } = this.props;

    publishListing(id);
  }

  render() {
    const {
      isPublishing,
      styles,
    } = this.props;

    return (
      <div {...css(styles.container)}>
        <Card padded>
          <FlexBar
            after={(
              <div {...css(styles.actions)}>
                <Spacing inline right={1}>
                  <Button secondary size="lg" disabled={isPublishing} onPress={this.onPressEdit}>
                    Edit
                  </Button>
                </Spacing>
                <Button primary size="lg" disabled={isPublishing} loading={isPublishing} onPress={this.onPressPublish}>
                  Publish
                </Button>
              </div>
            )}
          >
            <Text size="xl">
              This is how your listing will look to the public
            </Text>
          </FlexBar>
        </Card>
      </div>
    );
  }
}

UnstyledListingPreviewActions.propTypes = propTypes;
UnstyledListingPreviewActions.defaultProps = defaultProps;

export default withStyles(({ unit }) => ({
  container: {
    margin: `0 -${2 * unit}px`,
  },

  actions: {
    whiteSpace: 'nowrap',
  },
}))(UnstyledListingPreviewActions);
