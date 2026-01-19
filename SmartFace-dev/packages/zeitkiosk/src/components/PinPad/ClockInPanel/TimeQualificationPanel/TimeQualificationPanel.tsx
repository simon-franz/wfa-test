import { useMediaQuery } from '@hrworks/design-system';
import ComboBox from '@hrworks/sui-core/ComboBox';
import GridItem from '@hrworks/sui-core/GridItem';
import Select from '@hrworks/sui-core/Select';
import { useTranslations } from 'next-intl';
import { useContext, useMemo, useState } from 'react';

import type { components } from 'packages/api-schema/src';

import { useBookingToProject } from '../../../../hooks/useBookingToProject';
import { AppContext } from '../../../App/AppContext';
import { S } from './TimeQualificationPanel.styles';
import type { TimeQualificationPanelProps } from './TimeQualificationPanel.types';

type WorkingTime = components['schemas']['WorkingTimeTypes'];

const workingTimeTypes: WorkingTime[] = [
  'workingTime',
  'doctorsAppointment',
  'educationAndTraining',
  'governmentAgencyAppointment',
  'businessErrand',
  'physicalTherapy',
  'postOffice',
];

export const TimeQualificationPanel = (props: TimeQualificationPanelProps) => {
  const t = useTranslations('clockInPanel.timeQualificationPanel');
  const { isTimeTypeSelectionEnabled, isProjectBookingEnabled } = useContext(AppContext);
  const [selectedTimeType, setSelectedTimeType] = useState('workingTime');
  const { value, query, getOptions, onValueChange, onQueryChange } = useBookingToProject();
  const isSmallDevice = useMediaQuery('isSmallDevice');

  // TODO: When workingTimeTypes comes from API, add safety check and include them as dependency
  const workingTimeOptions = useMemo(() => {
    return workingTimeTypes.map((workingTimeType) => ({
      label: t(`workingTimeTypeKey.${workingTimeType}`),
      value: workingTimeType as string,
    }));
  }, [t]);

  if (!isTimeTypeSelectionEnabled && !isProjectBookingEnabled) {
    return null;
  }

  return (
    <>
      {isTimeTypeSelectionEnabled && (
        <GridItem {...props}>
          <S.WorkingTimeTypeAndProjectSelectWrapper>
            <Select
              name="selectTimeType"
              label={t('label')}
              noOptionsAvailableText={t('noOptionsAvailableText')}
              options={workingTimeOptions}
              onValueChange={(value) => setSelectedTimeType(value)}
              value={selectedTimeType}
            />
          </S.WorkingTimeTypeAndProjectSelectWrapper>
        </GridItem>
      )}
      {isProjectBookingEnabled && (
        <GridItem {...props}>
          <S.WorkingTimeTypeAndProjectSelectWrapper>
            <ComboBox
              getResultMinLength={0}
              getResultDelay={500}
              label={t('selectProjectLabel')}
              name="select-project"
              value={value}
              query={query}
              onValueChange={onValueChange}
              onQueryChange={onQueryChange}
              getOptions={getOptions}
              presentation={isSmallDevice ? 'modal' : 'dropdown'}
            />
          </S.WorkingTimeTypeAndProjectSelectWrapper>
        </GridItem>
      )}
    </>
  );
};
