import { Field } from 'redux-form';
import React from 'react';

import { FORM_FIELD_DISCLOSURES } from '../../constants/form';
import { css, withStyles } from '../../../../shared/hocs/withStyles';
import DropzoneController from '../../../../shared/components/Dropzone/DropzoneController';
import IllustrationDisclosureIcon from '../../../../shared/components/icons/IllustrationDisclosureIcon';
import Spacing from '../../../../shared/components/Spacing';
import Text from '../../../../shared/components/Text';

export function UploadDisclosuresInput(props) {
  const { input, styles } = props;

  return (
    <DropzoneController
      onChange={input.onChange}
      previewFiles
      acceptApplication
      acceptImage
    >
      <div {...css(styles.center)}>
        <Spacing bottom={1}>
          <IllustrationDisclosureIcon />
        </Spacing>
        <Text muted size="lg">BROWSE DISCLOSURES OR DRAG THEM INSIDE</Text>
      </div>
    </DropzoneController>
  );
}

export const StyledUploadDisclosuresInput = withStyles(() => ({
  center: {
    textAlign: 'center',
  },
}), { pureComponent: true })(UploadDisclosuresInput);

export default function DisclosuresField(props) {
  return (
    <Field
      name={FORM_FIELD_DISCLOSURES}
      component={StyledUploadDisclosuresInput}
      {...props}
    />
  );
}
