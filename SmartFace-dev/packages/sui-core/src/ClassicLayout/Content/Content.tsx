import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ClassicLayoutContext } from '../ClassicLayoutContext';
import { S } from './Content.styles';
import type { ContentProps } from './Content.types';

export const Content = observer(({ children, headerChildren, ...otherProps }: ContentProps) => {
  const { isDesktopSidebarVisible } = useContext(ClassicLayoutContext);

  return (
    <S.ContentContainer $isDesktopSidebarVisible={isDesktopSidebarVisible} {...otherProps}>
      {headerChildren && <S.SubHeader>{headerChildren}</S.SubHeader>}
      <S.ContentChildren>{children}</S.ContentChildren>
    </S.ContentContainer>
  );
});
