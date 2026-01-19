import { KeyboardNavigableListSublist } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';

import { S } from './DropdownMenuWrapper.styles';
import type { DropdownMenuWrapperProps } from './DropdownMenuWrapper.types';

export const DropdownMenuWrapper = observer(({ submenu, children, ...otherProps }: DropdownMenuWrapperProps) => {
  return submenu ? (
    <KeyboardNavigableListSublist>
      {({ isOpen }) => (
        <S.SublistWrapper isOpen={isOpen} {...otherProps}>
          {children}
        </S.SublistWrapper>
      )}
    </KeyboardNavigableListSublist>
  ) : (
    <S.Wrapper onClick={(event) => event.stopPropagation()} {...otherProps}>
      {children}
    </S.Wrapper>
  );
});
