import React from 'react';

import Card from '../../../shared/components/Card';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import Text from '../../../shared/components/Text';
import DisclosuresField from './fields/DisclosuresField';
import ShareDisclosureActivityField from './fields/ShareDisclosureActivityField';

export default function UploadDisclosuresSection() {
  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Upload Disclosures
        </Title>
      </Spacing>
      <Card padded>
        <Spacing bottom={1}>
          <Text>
            Disclosure packages will be available for buyer's agents to download from your listing page. We'll give you a link to share with anyone you like and we'll notify you or every download.
          </Text>
        </Spacing>
        <Spacing bottom={2}>
          <ShareDisclosureActivityField />
        </Spacing>
        <DisclosuresField />
      </Card>
    </div>
  );
}
