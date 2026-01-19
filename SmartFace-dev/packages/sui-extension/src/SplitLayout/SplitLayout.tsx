import { PageContext } from '@hrworks/sui-core/Page/PageContext';
import { useContext } from 'react';

import { S } from './SplitLayout.styles';
import type { SplitLayoutProps } from './SplitLayout.types';

export const SplitLayout = ({ expandSidebar, sidebarChildren, children, logo, ...otherProps }: SplitLayoutProps) => {
  const { notifications } = useContext(PageContext);

  return (
    <S.LayoutContainer expandSidebar={expandSidebar} {...otherProps}>
      <S.Sidebar expandSidebar={expandSidebar} sidebarChildren={Boolean(sidebarChildren)}>
        {sidebarChildren}
      </S.Sidebar>
      <S.Content expandSidebar={expandSidebar}>
        {logo?.src && (
          <S.LogoWrapper>
            <S.LogoContainer expandSidebar={expandSidebar}>
              <S.MotionDiv transition={{ duration: 0.5 }} layout>
                <a href={logo.href} target={logo.target} onClick={logo.onClick}>
                  <S.LogoImage alt={logo.alt} src={logo.src} />
                </a>
              </S.MotionDiv>
            </S.LogoContainer>
          </S.LogoWrapper>
        )}
        {children}
      </S.Content>
      <S.Notifications notifications={notifications} />
    </S.LayoutContainer>
  );
};
