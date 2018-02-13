import React from 'react';

import PhotosField from './fields/PhotosField';
import Card from '../../../shared/components/Card';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';

export default function UploadPhotosSection() {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Photos
        </Title>
      </Spacing>
      <Card padded>
        <PhotosField />
      </Card>
    </div>
  );
}
