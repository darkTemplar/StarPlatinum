import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_PHOTOS } from '../../constants/form';
import { css, withStyles } from '../../../../shared/hocs/withStyles';
import DropzoneController from '../../../../shared/components/Dropzone/DropzoneController';
import IllustrationPhotoIcon from '../../../../shared/components/icons/IllustrationPhotoIcon';
import Spacing from '../../../../shared/components/Spacing';
import Text from '../../../../shared/components/Text';

export function UploadPhotosInput(props) {
  const { input, styles, meta: { initial } } = props;

  const initialFiles = (initial || []).map(data => ({ src: data[0] }));

  return (
    <DropzoneController
      initialFiles={initialFiles}
      onChange={input.onChange}
      previewImages
    >
      <div {...css(styles.center)}>
        <Spacing bottom={1}>
          <IllustrationPhotoIcon />
        </Spacing>
        <Text muted size="lg">BROWSE PHOTOS OR DRAG THEM INSIDE</Text>
      </div>
    </DropzoneController>
  );
}

export const StyledUploadPhotosInput = withStyles(() => ({
  center: {
    textAlign: 'center',
  },
}), { pureComponent: true })(UploadPhotosInput);

export default function PhotosField(props) {
  return (
    <Field
      name={FORM_FIELD_PHOTOS}
      component={StyledUploadPhotosInput}
      {...props}
    />
  );
}
