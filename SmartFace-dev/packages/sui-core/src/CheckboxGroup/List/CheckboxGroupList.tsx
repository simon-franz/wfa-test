import { LocalizationContext } from '@hrworks/localization';
import pull from 'lodash/pull';
import { observer } from 'mobx-react';
import { useCallback, useContext, useMemo } from 'react';

import Checkbox from '../../Checkbox';
import { S } from './CheckboxGroupList.styles';
import type { CheckboxGroupListProps } from './CheckboxGroupList.types';

export const CheckboxGroupList = observer(
  ({
    optionsDirection = 'column',
    disabled,
    size = 'medium',
    options,
    id,
    noOptionsAvailableText,
    value,
    onValueChange,
    validationState,
    ...otherProps
  }: CheckboxGroupListProps) => {
    const { translate } = useContext(LocalizationContext);

    const _onValueChange = useCallback(
      (valueId: string, checked: boolean): void => {
        const _value = Array.isArray(value) ? [...value] : [];

        if (checked && !_value.includes(valueId)) {
          _value.push(valueId);
        } else if (!checked && _value.includes(valueId)) {
          pull(_value, valueId);
        }
        onValueChange && onValueChange(_value);
      },
      [onValueChange, value],
    );

    const memoizedOptions = useMemo(
      () =>
        options.map(({ id: optionValue, label }) => (
          <Checkbox
            size={size}
            key={optionValue}
            id={optionValue}
            name={optionValue}
            data-input-group-id={id} // TODO: This shouldn't be here - see FE-3752
            label={label}
            onValueChange={(checked) => _onValueChange(optionValue, checked)}
            checked={value?.includes(optionValue)}
            disabled={disabled}
            validationState={validationState}
          />
        )),
      [options, size, id, value, disabled, validationState, _onValueChange],
    );

    return memoizedOptions?.length ? (
      <S.List size={size} disabled={disabled} optionsDirection={optionsDirection} {...otherProps}>
        {memoizedOptions}
      </S.List>
    ) : (
      <div>{noOptionsAvailableText || translate('no-options-available-text')}</div>
    );
  },
);
