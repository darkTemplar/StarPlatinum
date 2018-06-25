import { Types, Shape } from 'react-validators';

export default Shape({
  lng: Types.number.isRequired,
  lat: Types.number.isRequired,
});
