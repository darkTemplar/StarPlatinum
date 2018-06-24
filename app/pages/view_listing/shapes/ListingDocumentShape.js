import { Types, Shape } from 'react-validators';

export const GeoShape = Shape({
  lng: Types.number.isRequired,
  lat: Types.number.isRequired,
});

export default Shape({
  location: GeoShape.isRequired,
  viewport: Shape({
    northeast: GeoShape.isRequired,
    southwest: GeoShape.isRequired,
  }),
});
