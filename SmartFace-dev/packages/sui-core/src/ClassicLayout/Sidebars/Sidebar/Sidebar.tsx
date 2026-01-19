import { observer } from 'mobx-react';

import { S } from './Sidebar.styles';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = observer(({ children, brandingElement, ...otherProps }: SidebarProps) => (
  <S.Container {...otherProps}>
    {brandingElement}
    <S.Scroller>{children}</S.Scroller>
  </S.Container>
));
