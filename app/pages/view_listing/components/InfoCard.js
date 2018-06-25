import { Row, Col } from 'react-grid-system';
import { forbidExtraProps } from 'airbnb-prop-types';
import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Card from '../../../shared/components/Card';
import CustomMap from '../../../shared/map';
import GeometryShape from '../shapes/GeometryShape';
import ListingShape from '../shapes/ListingShape';
import PropertyShape from '../shapes/PropertyShape';
import Title from '../../../shared/components/Title';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape.isRequired,
  geometry: GeometryShape.isRequired,
  ...withStylesPropTypes,
});

export function UnstyledInfoCard({
  property: {
    route,
  },
  geometry: {
    location,
  },
  styles,
}) {
  return (
    <Card>
      <Row>
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
        <Col>
          <Title level={1}>
            {route}
          </Title>
        </Col>
      </Row>
    </Card>
  );
}

UnstyledInfoCard.propTypes = propTypes;

export default withStyles(() => ({
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
}))(UnstyledInfoCard);