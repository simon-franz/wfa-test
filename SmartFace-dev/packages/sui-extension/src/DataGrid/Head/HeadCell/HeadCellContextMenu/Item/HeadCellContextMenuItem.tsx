import { observer } from 'mobx-react';

import { S } from './HeadCellContextMenuItem.styles';
import type { HeadCellContextMenuItemProps } from './HeadCellContextMenuItem.types';

export const HeadCellContextMenuItem = observer(
  ({ iconName, children, ...otherProps }: HeadCellContextMenuItemProps) => (
    <S.Item {...otherProps}>
      <S.IconWrapper>{iconName && <S.Icon name={iconName} />}</S.IconWrapper>
      {children}
    </S.Item>
  ),
);
