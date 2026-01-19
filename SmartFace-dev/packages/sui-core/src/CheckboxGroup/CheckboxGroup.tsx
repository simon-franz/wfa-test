import { observer } from 'mobx-react';

import { S } from '../FormGroup/GroupFormGroup.styles.ts';
import type { CheckboxGroupProps } from './CheckboxGroup.types';
import { CheckboxGroupList } from './List/CheckboxGroupList';

export const CheckboxGroup = observer(
  ({
    id,
    optionsDirection = 'column',
    disabled,
    size = 'medium',
    options,
    noOptionsAvailableText,
    value,
    onValueChange,
    ...otherProps
  }: CheckboxGroupProps) => (
    <S.GroupFormGroup disabled={disabled} size={size} element="div" {...otherProps}>
      <CheckboxGroupList
        id={id}
        size={size}
        value={value}
        options={options}
        optionsDirection={optionsDirection}
        noOptionsAvailableText={noOptionsAvailableText}
        onValueChange={onValueChange}
        disabled={disabled}
      />
    </S.GroupFormGroup>
  ),
);
