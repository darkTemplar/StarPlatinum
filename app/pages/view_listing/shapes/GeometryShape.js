import { Shape } from 'react-validators';

import GeoShape from '../../../shared/shapes/GeoShape';

export default Shape({
  location: GeoShape.isRequired,
  viewport: Shape({
    northeast: GeoShape.isRequired,
    southwest: GeoShape.isRequired,
  }),
});
