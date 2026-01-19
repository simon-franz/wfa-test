import { type KeyboardEvent, useContext } from 'react';

import { DropdownContext } from '../DropdownContext';
import { S } from './DropdownTrigger.styles';
import type { DropdownTriggerProps } from './DropdownTrigger.types';

export const DropdownTrigger = (props: DropdownTriggerProps) => {
  const { setReference, setIsOpen, isOpen } = useContext(DropdownContext);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <S.Trigger ref={setReference} onClick={() => setIsOpen(!isOpen)} tabIndex={0} onKeyDown={onKeyDown} {...props} />
  );
};
