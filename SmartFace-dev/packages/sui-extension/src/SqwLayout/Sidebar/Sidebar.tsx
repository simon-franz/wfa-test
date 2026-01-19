import { Divider } from '@hrworks/sui-core/Section/Divider';
import { observer } from 'mobx-react';

import { S } from './Sidebar.styles';
import type { SidebarProps } from './Sidebar.types';

export const Sidebar = observer(
  ({
    children,
    logo,
    upperSidebarChildren,
    brandingElement,
    showUpperSidebarChildren,
    ...otherProps
  }: SidebarProps) => (
    <S.Container {...otherProps}>
      {brandingElement}
      <S.Scroller>
        {!!upperSidebarChildren && !!showUpperSidebarChildren && (
          <S.UpperSidebarChildrenContainer>
            {upperSidebarChildren}
            <Divider />
          </S.UpperSidebarChildrenContainer>
        )}
        {children}
      </S.Scroller>
    </S.Container>
  ),
);
