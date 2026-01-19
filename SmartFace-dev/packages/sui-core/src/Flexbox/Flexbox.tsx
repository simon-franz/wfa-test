import { observer } from 'mobx-react';

import { S } from './Flexbox.styles';
import type { FlexboxProps } from './Flexbox.types';

export const Flexbox = observer(({ gap = 'default', flexWrap = 'wrap', ...otherProps }: FlexboxProps) => (
  <S.Flexbox gap={gap} flexWrap={flexWrap} {...otherProps} />
));
