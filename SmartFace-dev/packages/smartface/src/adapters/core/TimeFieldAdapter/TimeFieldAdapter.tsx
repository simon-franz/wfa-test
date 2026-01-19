import TimeField from '@hrworks/sui-core/TimeField';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import useTranslateInputProps from '../../../adapters/shared/useTranslateInputProps';
import { ComponentMapper } from '../../../main/components/ComponentMapper';
import { DefaultValueContext } from '../../../main/components/DefaultValueProvider';
import type { TimeFieldAdapterProps } from './TimeFieldAdapter.types';

export const TimeFieldAdapter = observer(({ timePickerToggleIcon, ...otherProps }: TimeFieldAdapterProps) => {
  const { defaultSize } = useContext(DefaultValueContext);
  const _timePickerToggleIcon = timePickerToggleIcon && <ComponentMapper smartFaceComponent={timePickerToggleIcon} />;

  return (
    <TimeField
      timePickerToggleIcon={_timePickerToggleIcon}
      size={defaultSize}
      {...useTranslateInputProps(otherProps)}
    />
  );
});
