import { LocalizationContext } from '@hrworks/localization';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { S as GroupFormGroupStyles } from '../FormGroup/GroupFormGroup.styles.ts';
import { S } from './RadioGroup.styles';
import type { RadioGroupProps } from './RadioGroup.types';
import { RadioGroupContext } from './RadioGroupContext';

export const RadioGroup = observer(
  ({
    disabled,
    validationMessage,
    validationState,
    helpText,
    mandatory,
    size = 'medium',
    label,
    optionsDirection = 'column',
    noOptionsAvailableText,
    value,
    name,
    onValueChange,
    children,
    'aria-label': ariaLabel,
    ...otherProps
  }: RadioGroupProps) => {
    const { translate } = useContext(LocalizationContext);

    return (
      <GroupFormGroupStyles.GroupFormGroup
        disabled={disabled}
        validationMessage={validationMessage}
        validationState={validationState}
        helpText={helpText}
        mandatory={mandatory}
        size={size}
        label={label}
        element="div"
        {...otherProps}
      >
        {children ? (
          <RadioGroupContext.Provider
            value={{
              disabled,
              size,
              name,
              value,
              onValueChange,
              optionsDirection,
              validationState,
            }}
          >
            <S.RadioGroupContainer
              size={size}
              optionsDirection={optionsDirection}
              disabled={disabled}
              role="radiogroup"
              aria-label={ariaLabel}
            >
              {children}
            </S.RadioGroupContainer>
          </RadioGroupContext.Provider>
        ) : (
          <div>{noOptionsAvailableText || translate('no-options-available-text')}</div>
        )}
      </GroupFormGroupStyles.GroupFormGroup>
    );
  },
);
