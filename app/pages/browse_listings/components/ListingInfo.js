import { Col, Row } from 'react-grid-system';
import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import ListingShape from '../../view_listing/shapes/ListingShape';
import PropertyShape from '../../view_listing/shapes/PropertyShape';
import Spacing from '../../../shared/components/Spacing';
import Text from '../../../shared/components/Text';
import Title from '../../../shared/components/Title';
import formatCurrency from '../../../shared/utils/formatters/formatCurrency';

const propTypes = forbidExtraProps({
  listing: ListingShape.isRequired,
  property: PropertyShape,
  disclosures: PropTypes.arrayOf(PropTypes.string),
});

const defaultProps = {
  property: null,
  disclosures: [],
};

export default function ListingInfo({
  listing,
  property,
  disclosures,
}) {
  const { listing_price: listPrice, final_expiry: finalExpire } = listing;
  const { formatted_address: formattedAddress } = property;

  return (
    <div>
      <Spacing bottom={2}>
        <Title level={2}>
          {formattedAddress}
        </Title>
      </Spacing>
      <Row>
        <Col md={6} sm={12}>
          <Text size="xl">
            {formatCurrency(listPrice, {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
              maximumSignificantDigits: 21,
            })}
          </Text>
          <Spacing top={1}>
            <Text muted>
              List price
            </Text>
          </Spacing>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <Text size="xl">
            {moment().from(moment(finalExpire))}
          </Text>
          <Spacing top={1}>
            <Text muted>
              Offers due
            </Text>
          </Spacing>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <Text size="xl">
            N
          </Text>
          <Spacing top={1}>
            <Text muted>
              Offers
            </Text>
          </Spacing>
        </Col>
        <Col lg={3} md={6} sm={12}>
          <Text size="xl">
            {disclosures.length}
          </Text>
          <Spacing top={1}>
            <Text muted>
              Disclosures
            </Text>
          </Spacing>
        </Col>
      </Row>
    </div>
  );
}

ListingInfo.propTypes = propTypes;
ListingInfo.defaultProps = defaultProps;
