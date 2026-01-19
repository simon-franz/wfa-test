import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ClassicLayoutContext } from '../ClassicLayoutContext';
import { S } from './Footer.styles';
import type { FooterProps } from './Footer.types';

export const Footer = observer((props: FooterProps) => {
  const { isDesktopSidebarVisible } = useContext(ClassicLayoutContext);

  return <S.Footer $isDesktopSidebarVisible={isDesktopSidebarVisible} {...props} />;
});
