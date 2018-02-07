import React from 'react';

import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import Card from '../../../shared/components/Card';

export default function UploadPhotos() {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Photos
        </Title>
      </Spacing>
      <Card padded>
        UPLOAD
      </Card>
    </div>
  );
}