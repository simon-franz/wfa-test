import { observer } from 'mobx-react';
import { useContext } from 'react';

import { RadioGroupContext } from '../RadioGroupContext';
import { S } from './Radio.styles';
import type { RadioProps } from './Radio.types';

export const Radio = observer(({ value, children, justifyContent = 'flex-start', ...otherProps }: RadioProps) => {
  const { disabled, name, value: selectedValue, onValueChange, size, validationState } = useContext(RadioGroupContext);
  const isChecked = selectedValue === value;

  return (
    <S.FormGroup
      size={size}
      disabled={disabled}
      justifyContent={justifyContent}
      labelChildren={children}
      validationState={validationState}
    >
      <S.Input
        type="radio"
        role="radio"
        name={name}
        value={value}
        disabled={disabled}
        aria-checked={isChecked}
        checked={isChecked}
        onKeyDown={(event) => {
          if (event.key === ' ' || event.key === 'Spacebar') {
            event.preventDefault();
            onValueChange?.(value);
          }
        }}
        onChange={() => {
          onValueChange?.(value);
        }}
        {...otherProps}
      />
      <S.Radio size={size} />
    </S.FormGroup>
  );
});
