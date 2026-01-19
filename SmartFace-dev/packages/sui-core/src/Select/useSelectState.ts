import { useEffect, useState } from 'react';

import type { SelectOptionProps, SelectProps } from './Select.types';

export const useSelectState = (
  controlledValue?: SelectProps['value'],
  defaultValue?: SelectProps['value'],
  isMultiple: boolean = false,
  options: SelectOptionProps[] = [],
) => {
  const getDefaultInternalSelectedValue = () => {
    if (controlledValue === undefined && defaultValue === undefined && !isMultiple) {
      const firstOption = options[0];

      return firstOption.options ? firstOption.options[0].value : firstOption.value;
    }

    return controlledValue || defaultValue || (isMultiple ? [] : '');
  };

  const [internalSelectedValue, setInternalSelectedValue] = useState(getDefaultInternalSelectedValue());

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalSelectedValue;

  useEffect(() => {
    if (isControlled && controlledValue !== internalSelectedValue) {
      setInternalSelectedValue(controlledValue);
    }
  }, [internalSelectedValue, isControlled, controlledValue]);

  return {
    value,
    setInternalSelectedValue,
    isControlled,
  };
};
