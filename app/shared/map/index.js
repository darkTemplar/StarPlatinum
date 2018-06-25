import { compose, withProps, setPropTypes } from 'recompose';
import { forbidExtraProps } from 'airbnb-prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';
import React from 'react';

import GeoShape from '../shapes/GeoShape';

const propTypes = forbidExtraProps({
  defaultZoom: PropTypes.number,
  center: GeoShape.isRequired,
  marker: GeoShape,
});

const defaultProps = {
  defaultZoom: 8,
  marker: null,
};

class PureMap extends React.PureComponent {
  render() {
    const { marker, center, defaultZoom } = this.props;

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={center}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    );
  }
}

PureMap.propTypes = propTypes;
PureMap.defaultProps = defaultProps;

export default setPropTypes({
  loadingElement: PropTypes.node.isRequired,
  containerElement: PropTypes.node.isRequired,
  mapElement: PropTypes.node.isRequired,
})(compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  }),
  withScriptjs,
  withGoogleMap,
)(PureMap));
