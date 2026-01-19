import { observer } from 'mobx-react';
import { useContext } from 'react';

import { ClassicLayoutContext } from '../../ClassicLayoutContext';
import { S } from './Branding.styles';
import type { BrandingProps } from './Branding.types';

export const Branding = observer(
  ({ alt, href, onClick, src, target, title, children, ...otherProps }: BrandingProps) => {
    const { hasSidebar, isDesktopSidebarExpanded } = useContext(ClassicLayoutContext);

    return (
      <S.Container isDesktopSidebarExpanded={isDesktopSidebarExpanded} hasSidebar={hasSidebar} {...otherProps}>
        {children}
        {(src || title) && <S.Logo alt={alt} href={href} onClick={onClick} src={src} target={target} title={title} />}
      </S.Container>
    );
  },
);
