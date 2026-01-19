import { Notifications } from '@hrworks/sui-core/ClassicLayout/Notifications';
import { PageContext } from '@hrworks/sui-core/Page/PageContext';
import { observer } from 'mobx-react';
import { useContext } from 'react';

import { S } from './HrworksAdminLayout.styles';
import type { HrworksAdminLayoutProps } from './HrworksAdminLayout.types';
import { HrworksAdminLayoutContext } from './HrworksAdminLayoutContext';

export const HrworksAdminLayout = observer(
  ({ activeNavigationItemId, header, contentHeaderChildren, children, ...otherProps }: HrworksAdminLayoutProps) => {
    const { notifications } = useContext(PageContext);

    const showFirstDividerLine: boolean = Boolean(header && (children || contentHeaderChildren));
    const showSecondDividerLine: boolean = Boolean(contentHeaderChildren || (children && contentHeaderChildren));

    return (
      <HrworksAdminLayoutContext.Provider value={{ activeNavigationItemId }}>
        <S.Layout {...otherProps}>
          <div>
            <S.Header>
              <S.LeftContainer>
                {header?.logo?.src && (
                  <S.LogoContainer href={header.logo.href} target={header.logo.target}>
                    <S.Logo alt={header.logo.alt} src={header.logo.src} />
                  </S.LogoContainer>
                )}
              </S.LeftContainer>
              <S.NavigationWrapper>
                <S.NavigationContainer>{header?.navigationItems}</S.NavigationContainer>
              </S.NavigationWrapper>
              {header?.children && <S.RightContainer>{header?.children}</S.RightContainer>}
            </S.Header>
            {showFirstDividerLine && <S.StyledDivider />}
            {contentHeaderChildren && <S.Container>{contentHeaderChildren}</S.Container>}
            {showSecondDividerLine && <S.StyledDivider />}
          </div>
          {children && <S.Container>{children}</S.Container>}
          <Notifications notifications={notifications} />
        </S.Layout>
      </HrworksAdminLayoutContext.Provider>
    );
  },
);
