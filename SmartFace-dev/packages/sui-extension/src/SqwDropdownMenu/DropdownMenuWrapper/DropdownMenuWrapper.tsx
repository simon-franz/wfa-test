import { KeyboardNavigableListSublist } from '@hrworks/sui-shared/components/KeyboardNavigableList';
import { observer } from 'mobx-react';

import { S } from './DropdownMenuWrapper.styles';
import type { DropdownMenuWrapperProps } from './DropdownMenuWrapper.types';

export const DropdownMenuWrapper = observer(({ submenu, children, ...otherProps }: DropdownMenuWrapperProps) => {
  return submenu ? (
    <KeyboardNavigableListSublist>
      {(sublistProps) => (
        <S.SublistWrapper {...sublistProps} {...otherProps}>
          {children}
        </S.SublistWrapper>
      )}
    </KeyboardNavigableListSublist>
  ) : (
    <S.Wrapper {...otherProps}>{children}</S.Wrapper>
  );
});
