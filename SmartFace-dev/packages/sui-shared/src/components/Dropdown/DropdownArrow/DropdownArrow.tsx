import { useContext } from 'react';

import { DropdownContext } from '../DropdownContext';
import type { DropdownArrowProps } from './DropdownArrow.types';

export const DropdownArrow = (props: DropdownArrowProps) => {
  const { arrowRef, arrowStyles } = useContext(DropdownContext);

  return <div ref={arrowRef} style={arrowStyles} {...props} />;
};
