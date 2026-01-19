import { observer } from 'mobx-react';

import { S } from './Content.styles';
import type { ContentProps } from './Content.types';

export const Content = observer(({ children, ...otherProps }: ContentProps) => (
  <S.Wrapper {...otherProps}>
    <S.Container>{children}</S.Container>
  </S.Wrapper>
));
