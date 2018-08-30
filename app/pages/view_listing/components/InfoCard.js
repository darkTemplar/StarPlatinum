import { Row, Col } from 'react-grid-system';
import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Card from '../../../shared/components/Card';
import Carousel from '../../../shared/components/Carousel';
import CustomMap from '../../../shared/map';
import GeometryShape from '../shapes/GeometryShape';
import ListingShape from '../shapes/ListingShape';
import PaddedCol from '../../../shared/components/PaddedCol';
import PropertyShape from '../shapes/PropertyShape';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';
import Title from '../../../shared/components/Title';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape.isRequired,
  geometry: GeometryShape.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  ...withStylesPropTypes,
});

export function UnstyledInfoCard({
  property: {
    route,
    city,
    state,
    postal_code: postalCode,
  },
  geometry: {
    location,
  },
  images,
  styles,
  listing: {
    baths,
    beds,
    area,
  },
}) {
  return (
    <Spacing top={2}>
      <Carousel
        images={images}
        height={300}
        widthPercent={70}
      />
      <Spacing top={-4}>
        <div {...css(styles.cardPadding)}>
          <Card>
            <Row nogutter>
              <Col md={12} lg={4}>
                <CustomMap
                  center={location}
                  marker={location}
                  defaultZoom={13}
                  loadingElement={<div {...css(styles.mapContainer)} />}
                  containerElement={<div {...css(styles.mapContainer)} />}
                  mapElement={<div {...css(styles.map)} />}
                />
              </Col>
              <div>
                <PaddedCol>
                  <Title level={1}>
                    {route}
                  </Title>
                  <Text muted>
                    {city}, {state} {postalCode} | {beds} bed, {baths} bath, {area} sqft
                  </Text>
                </PaddedCol>
              </div>
              <div {...css(styles.priceBox)}>
              </div>
            </Row>
          </Card>
        </div>
      </Spacing>
    </Spacing>
  );
}

UnstyledInfoCard.propTypes = propTypes;

export default withStyles(({ unit }) => ({
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: 0,
    paddingBottom: '75%',
  },

  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  cardPadding: {
    padding: `0 ${2 * unit}px`,
    position: 'relative',
    zIndex: 1,
  },

  priceBox: {

  },
}))(UnstyledInfoCard);
