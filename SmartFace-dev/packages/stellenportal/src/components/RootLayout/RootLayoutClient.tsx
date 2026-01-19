'use client';

import { Footer } from '../Footer';
import { S } from './RootLayout.styles';
import type { RootLayoutClientProps } from './RootLayout.types';

export const RootLayoutClient = ({ hideFooter, settings, children, ...otherProps }: RootLayoutClientProps) => (
  <S.Container {...otherProps}>
    <S.Content>{children}</S.Content>
    {!hideFooter && <Footer settings={settings} />}
  </S.Container>
);
