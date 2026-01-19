import { observer } from 'mobx-react';

import { S } from './Content.styles';
import type { ContentProps } from './Content.types';

export const Content = observer(({ children, borderless, ...otherProps }: ContentProps) => (
  <S.ContentContainer {...otherProps}>
    <S.Content borderless={borderless}>{children}</S.Content>
  </S.ContentContainer>
));
