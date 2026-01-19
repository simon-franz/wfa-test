import { observer } from 'mobx-react';
import { useContext } from 'react';

import { Notifications } from '../ClassicLayout/Notifications';
import { PageContext } from '../Page/PageContext';
import { S } from './BlankLayout.styles';
import type { BlankLayoutProps } from './BlankLayout.types';

export const BlankLayout = observer(({ children, logo, ...otherProps }: BlankLayoutProps) => {
  const hasLogo = !!logo?.src;
  const { notifications } = useContext(PageContext);

  return (
    <S.BlankLayoutContainer hasLogo={hasLogo} {...otherProps}>
      {hasLogo && <S.Logo {...logo} />}
      <S.Content hasLogo={hasLogo}>{children}</S.Content>
      <Notifications notifications={notifications} />
    </S.BlankLayoutContainer>
  );
});
