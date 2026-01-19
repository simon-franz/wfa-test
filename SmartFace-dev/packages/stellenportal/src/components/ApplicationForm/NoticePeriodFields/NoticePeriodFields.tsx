'use client';

import Checkbox from '@hrworks/sui-core/Checkbox';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FormField } from '../FormField';
import type { NoticePeriodFieldsProps } from './NoticePeriodFields.types';

export const NoticePeriodFields = ({ visibility }: NoticePeriodFieldsProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const t = useTranslations('FormFields');
  if (visibility === 'NotVisible' || visibility === 'Administrator') {
    return;
  }

  return (
    <GridItem>
      <Grid>
        <GridItem>
          <Checkbox
            name="hasNoticePeriod"
            mandatory={visibility === 'Mandatory'}
            checked={isChecked}
            onValueChange={() => setIsChecked(!isChecked)}
            label={t('hasNoticePeriod')}
          />
        </GridItem>
        {isChecked && (
          <>
            <FormField fieldKey="noticePeriodTimeAmount" visibility={visibility} />
            <FormField fieldKey="noticePeriodTimeUnit" visibility={visibility} />
            <FormField fieldKey="noticePeriodTimeReference" visibility={visibility} />
          </>
        )}
      </Grid>
    </GridItem>
  );
};
