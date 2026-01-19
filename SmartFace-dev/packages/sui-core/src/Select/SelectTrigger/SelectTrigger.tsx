import { LocalizationContext } from '@hrworks/localization';
import { forwardRef, useCallback, useContext, useMemo } from 'react';

import type { SelectOptionProps } from '../Select.types';
import InputDisplay from './InputDisplay';
import { S } from './SelectTrigger.styles';
import type { SelectTriggerProps } from './SelectTrigger.types';

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  (
    {
      disabled,
      hasOptions,
      noOptionsAvailableText,
      noOptionSelectedText,
      defaultValue,
      multiple,
      value,
      options,
      noneOption,
      ...otherProps
    },
    ref,
  ) => {
    const { translate } = useContext(LocalizationContext);

    const findOptionByValue = useCallback((options: SelectOptionProps[], value: string): SelectOptionProps | null => {
      for (const option of options) {
        if (option.value === value) return option;

        if (option.options) {
          const nestedOption = findOptionByValue(option.options, value);
          if (nestedOption) return nestedOption;
        }
      }

      return null;
    }, []);

    const renderValue = useMemo(() => {
      if (!hasOptions) {
        return noOptionsAvailableText || translate('no-options-available-text');
      }

      if (!value || value.length === 0) {
        if (multiple) {
          return noOptionSelectedText;
        }

        return <InputDisplay media={noneOption?.media} label={defaultValue || noneOption?.label} />;
      }

      if (multiple) {
        const multipleOptions = (value as string[]).map((optionValue) => findOptionByValue(options, optionValue));

        return (
          <InputDisplay
            label={multipleOptions
              .map((opt) => opt?.label)
              .filter(Boolean)
              .join(', ')}
          />
        );
      } else {
        const selectedOption = findOptionByValue(options, value as string);

        return (
          <InputDisplay
            media={selectedOption ? selectedOption.media : noneOption?.media}
            label={selectedOption ? selectedOption.label : defaultValue || noneOption?.label}
          />
        );
      }
    }, [
      defaultValue,
      noOptionSelectedText,
      findOptionByValue,
      hasOptions,
      multiple,
      noOptionsAvailableText,
      noneOption?.label,
      noneOption?.media,
      options,
      translate,
      value,
    ]);

    const tabIndex = useMemo(() => (!hasOptions || disabled ? undefined : 0), [disabled, hasOptions]);

    return (
      <S.InputFieldValue disabled={disabled} ref={ref} tabIndex={tabIndex} {...otherProps}>
        {renderValue}
      </S.InputFieldValue>
    );
  },
);
