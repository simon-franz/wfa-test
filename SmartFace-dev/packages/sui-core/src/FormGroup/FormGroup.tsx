import { HelpText } from '@hrworks/sui-shared/components/HelpText';
import { observer } from 'mobx-react';

import Label from '../Label';
import { S } from './FormGroup.styles';
import type { FormGroupProps } from './FormGroup.types';

export const FormGroup = observer(
  ({
    children,
    disabled,
    validationMessage,
    validationState,
    label,
    justifyContent = 'flex-start',
    helpText,
    mandatory,
    labelChildren,
    size = 'medium',
    element = 'label',
    ...otherProps
  }: FormGroupProps) => (
    <S.Container
      size={size}
      validationState={validationState}
      disabled={disabled}
      justifyContent={justifyContent}
      {...otherProps}
    >
      <S.ClickArea as={element} size={size} disabled={disabled}>
        {children}
        <Label label={label} validationState={validationState} mandatory={mandatory}>
          {labelChildren}
        </Label>
      </S.ClickArea>
      <HelpText
        size={size}
        helpText={helpText}
        validationMessage={validationMessage}
        validationState={validationState}
      />
    </S.Container>
  ),
);
