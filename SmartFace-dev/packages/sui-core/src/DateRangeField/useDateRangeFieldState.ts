import type { IsoDateRange } from '@hrworks/types/shared/UiTypes';
import isNil from 'lodash/isNil';
import { useEffect, useState } from 'react';

export const useDateRangeFieldState = (controlledValue?: IsoDateRange, defaultValue?: IsoDateRange) => {
  const isControlled = !isNil(controlledValue);

  const getInitialValue = (): IsoDateRange => {
    if (isControlled) {
      return controlledValue;
    }
    if (!isNil(defaultValue)) {
      return defaultValue;
    }

    return { from: '', to: '' };
  };

  const [internalValue, setInternalValue] = useState(getInitialValue());

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

  const setValue = (newValue: IsoDateRange) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return {
    value: isControlled ? controlledValue : internalValue,
    setValue,
  };
};
