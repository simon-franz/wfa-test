import { observer } from 'mobx-react';

import { S } from './FlexboxItem.styles';
import type { FlexboxItemProps } from './FlexboxItem.types';

export const FlexboxItem = observer(({ visible = true, ...otherProps }: FlexboxItemProps) => (
  <S.FlexboxItem visible={visible} {...otherProps} />
));
