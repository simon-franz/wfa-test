import { useContext } from 'react';

import { DropdownContext } from '../DropdownContext';
import type { DropdownContentProps } from './DropdownContent.types';

export const DropdownContent = (props: DropdownContentProps) => {
  const { setFloating, floatingStyles, isOpen } = useContext(DropdownContext);

  if (!isOpen) {
    return null;
  }

  return <div ref={setFloating} style={floatingStyles} {...props} />;
};
