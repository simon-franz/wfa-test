import { observer } from 'mobx-react';

import { S } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export const Switch = observer(
  ({
    justifyContent = 'flex-start',
    name,
    size = 'medium',
    disabled,
    labelChildren,
    label,
    helpText,
    mandatory,
    validationMessage,
    validationState,
    className,
    'aria-label': ariaLabel,
    ...otherProps
  }: SwitchProps) => {
    return (
      <S.FormGroup
        onClick={(e) => !disabled && e.stopPropagation()}
        disabled={disabled}
        name={name}
        size={size}
        justifyContent={justifyContent}
        labelChildren={labelChildren}
        label={label}
        helpText={helpText}
        mandatory={mandatory}
        validationMessage={validationMessage}
        validationState={validationState}
        aria-label={ariaLabel}
        className={className}
      >
        <S.SwitchInput type="checkbox" name={name} disabled={disabled} {...otherProps} />
        <S.Switch />
      </S.FormGroup>
    );
  },
);
