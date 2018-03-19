import { Shape, Types } from 'react-validators';

export default Shape({
  description: Types.string.isRequired,
  id: Types.string.isRequired,
  place_id: Types.string.isRequired,
});
