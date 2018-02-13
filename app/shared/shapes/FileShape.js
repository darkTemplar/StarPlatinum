import { Shape, Types } from 'react-validators';

export default Shape({
  id: Types.string.isRequired,
  // b64 data of uploaded file
  data: Types.string,
  // external source, indication of image
  src: Types.string,
  // name of file/image
  name: Types.string,
});
