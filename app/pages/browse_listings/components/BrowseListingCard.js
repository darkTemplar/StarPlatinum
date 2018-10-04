import { Row, Col } from 'react-grid-system';
import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import { FILE_TYPE_IMAGE } from '../../create_listing/constants/form';
import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Card from '../../../shared/components/Card';
import ListingShape from '../../view_listing/shapes/ListingShape';
import PropertyShape from '../../view_listing/shapes/PropertyShape';
import ListingImage from './ListingImage';
import ListingInfo from './ListingInfo';

const propTypes = forbidExtraProps({
  listingDocuments: PropTypes.arrayOf(PropTypes.array),
  listing: ListingShape.isRequired,
  property: PropertyShape,
  ...withStylesPropTypes,
});

const defaultProps = {
  property: null,
};

export function UnstyledBrowseListingCard({
  listing,
  property,
  listingDocuments,
  styles,
}) {
  const images = listingDocuments.filter(doc => doc[1] === FILE_TYPE_IMAGE);

  return (
    <Card>
      <div {...css(styles.contentContainer)}>
        <Row>
          <Col nogutter sm={12} md={3}>
            <ListingImage imageSrc={images[0] ? images[0][0] : null} />
          </Col>
          <Col nogutter sm={12} md={9}>
            <ListingInfo listing={listing} property={property} />
          </Col>
        </Row>
      </div>
    </Card>
  );
}

UnstyledBrowseListingCard.propTypes = propTypes;
UnstyledBrowseListingCard.defaultProps = defaultProps;

export default withStyles(({ responsive, unit }) => ({
  contentContainer: {
    [responsive.mediumAndAbove]: {
      padding: 2 * unit,
    },
  },
}))(UnstyledBrowseListingCard);
