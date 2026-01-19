import { observer } from 'mobx-react';
import { forwardRef, useContext } from 'react';

import { SqwDropdownMenuContext } from '../SqwDropdownMenuContext';
import { S } from './DropdownMenuTrigger.styles';
import type { DropdownMenuTriggerProps } from './DropdownMenuTrigger.types';

export const DropdownMenuTrigger = observer(
  forwardRef<HTMLDivElement, DropdownMenuTriggerProps>(({ children, ...otherProps }, ref) => {
    const { toggleDropdown, expanded } = useContext(SqwDropdownMenuContext);

    return (
      <S.Wrapper ref={ref} onClickCapture={() => toggleDropdown()} {...otherProps}>
        {typeof children === 'function' ? children({ open: expanded }) : children}
      </S.Wrapper>
    );
  }),
);
