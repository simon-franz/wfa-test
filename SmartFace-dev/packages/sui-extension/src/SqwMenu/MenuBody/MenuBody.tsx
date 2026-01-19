import { observer } from 'mobx-react';
import type { HTMLAttributes } from 'react';

import { S } from './MenuBody.styles';

export const MenuBody = observer(({ children, ...otherProps }: HTMLAttributes<HTMLDivElement>) => (
  <S.Wrapper {...otherProps}>{children}</S.Wrapper>
));
