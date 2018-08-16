import PropTypes from 'prop-types';
import React from 'react';

import {
  FORM_FIELD_PREFERENCES_1,
  FORM_FIELD_PREFERENCES_2,
  FORM_FIELD_PREFERENCES_3,
} from '../constants/form';
import SelectField from './fields/SelectField';
import SelectOptionShape from '../../../shared/shapes/SelectOptionShape';
import Spacing from '../../../shared/components/Spacing';
import Title from '../../../shared/components/Title';
import number from '../../../shared/form/parsers/number';

const propTypes = {
  preferencesValues: PropTypes.object,
  preferencesOptions: PropTypes.arrayOf(SelectOptionShape),
};

const defaultProps = {
  preferencesValues: {},
  preferencesOptions: [],
};

export default function PreferencesSection({
  preferencesOptions,
  preferencesValues,
}) {
  const preferences1Options = preferencesOptions.filter(
    option => (
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_2] &&
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_3]
    ),
  );
  const preferences2Options = preferencesOptions.filter(
    option => (
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_1] &&
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_3]
    ),
  );
  const preferences3Options = preferencesOptions.filter(
    option => (
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_1] &&
      option.value !== preferencesValues[FORM_FIELD_PREFERENCES_2]
    ),
  );

  const defaultOption = {
    value: null,
    label: 'Select preference',
  };

  return (
    <div>
      <Spacing bottom={1}>
        <Title level={3}>
          Other Preferences
        </Title>
      </Spacing>
      <div>
        <SelectField
          id="preferences-1"
          label="FIRST PRIORITY"
          name={FORM_FIELD_PREFERENCES_1}
          options={[defaultOption, ...preferences1Options]}
          parse={number}
          borderlessBottom
        />
        <SelectField
          id="preferences-2"
          label="SECOND PRIORITY"
          name={FORM_FIELD_PREFERENCES_2}
          options={[defaultOption, ...preferences2Options]}
          parse={number}
          borderlessBottom
        />
        <SelectField
          id="preferences-3"
          label="THIRD PRIORITY"
          name={FORM_FIELD_PREFERENCES_3}
          parse={number}
          options={[defaultOption, ...preferences3Options]}
        />
      </div>
    </div>
  );
}

PreferencesSection.propTypes = propTypes;
PreferencesSection.defaultProps = defaultProps;
