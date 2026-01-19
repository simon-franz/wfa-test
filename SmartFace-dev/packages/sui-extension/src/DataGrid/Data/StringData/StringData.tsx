import { observer } from 'mobx-react';

import { S } from './StringData.styles';
import type { StringDataProps } from './StringData.types';

export const StringData = observer(({ children, ...otherProps }: StringDataProps) => (
  <S.Wrapper {...otherProps}>{children}</S.Wrapper>
));
