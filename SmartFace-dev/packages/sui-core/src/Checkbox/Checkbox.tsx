import { observer } from 'mobx-react';

import { S } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = observer(
  ({
    size = 'medium',
    disabled,
    justifyContent = 'flex-start',
    label,
    labelChildren,
    onValueChange,
    helpText,
    onChange,
    validationMessage,
    validationState,
    mandatory,
    className,
    style,
    ...otherProps
  }: CheckboxProps) => (
    <S.FormGroup
      size={size}
      disabled={disabled}
      justifyContent={justifyContent}
      label={label}
      labelChildren={labelChildren}
      helpText={helpText}
      validationMessage={validationMessage}
      validationState={validationState}
      mandatory={mandatory}
      className={className}
      style={style}
    >
      <S.CheckboxInput
        type="checkbox"
        disabled={disabled}
        onChange={(event) => {
          onValueChange && onValueChange(event.target.checked);
          onChange?.(event);
        }}
        {...otherProps}
      />
      <S.Checkbox size={size}>
        <S.CheckIcon name="checkbox-check" />
      </S.Checkbox>
    </S.FormGroup>
  ),
);
