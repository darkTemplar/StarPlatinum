import React from 'react';

import {
  css,
  withStyles,
  withStylesPropTypes,
} from '../../../shared/hocs/withStyles';
import Card from '../../../shared/components/Card';
import Dropzone from '../../../shared/components/Dropzone';
import IllustrationPhotoIcon from '../../../shared/components/icons/IllustrationPhotoIcon';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import Text from '../../../shared/components/Text';

const propTypes = {
  ...withStylesPropTypes,
};

export function UploadPhotosSection({
  styles,
}) {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Photos
        </Title>
      </Spacing>
      <Card padded>
        <Dropzone>
          <div {...css(styles.center)}>
            <Spacing bottom={1}>
              <IllustrationPhotoIcon />
            </Spacing>
            <Text muted size="lg">BROWSE PHOTOS OR DRAG THEM INSIDE</Text>
          </div>
        </Dropzone>
      </Card>
    </div>
  );
}

UploadPhotosSection.propTypes= propTypes;

export default withStyles(() => ({
  center: {
    textAlign: 'center',
  },
}), { pureComponent: true })(UploadPhotosSection);
