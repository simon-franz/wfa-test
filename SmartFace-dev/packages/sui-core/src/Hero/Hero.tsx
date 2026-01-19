import { ThemeOverride } from '@hrworks/design-system';
import { observer } from 'mobx-react';

import { S } from './Hero.styles';
import type { HeroProps } from './Hero.types';

export const Hero = observer(({ children, ...otherProps }: HeroProps) => (
  <ThemeOverride theme="dark">
    <S.Container {...otherProps}>
      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
    </S.Container>
  </ThemeOverride>
));
