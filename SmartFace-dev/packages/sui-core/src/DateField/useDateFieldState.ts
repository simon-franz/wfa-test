import isNil from 'lodash/isNil';
import { useEffect, useState } from 'react';

export const useDateFieldState = (
  controlledValue?: string | number,
  defaultValue?: string | number | readonly string[],
) => {
  const isControlled = !isNil(controlledValue);

  const getInitialValue = (): string => {
    if (isControlled && controlledValue !== undefined) {
      return controlledValue.toString();
    }
    if (!isNil(defaultValue)) {
      return Array.isArray(defaultValue) ? defaultValue[0].toString() : defaultValue.toString();
    }

    return '';
  };

  const [internalValue, setInternalValue] = useState(getInitialValue());

  useEffect(() => {
    if (isControlled && controlledValue !== undefined) {
      setInternalValue(controlledValue.toString());
    }
  }, [isControlled, controlledValue]);

  const setValue = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return {
    value: isControlled && controlledValue !== undefined ? controlledValue.toString() : internalValue,
    setValue,
    isControlled,
  };
};
