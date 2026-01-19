import { observer } from 'mobx-react';

import { S } from './ModalHeaderTitle.styles';
import type { ModalHeaderTitleProps } from './ModalHeaderTitle.types';

export const ModalHeaderTitle = observer(({ id, title, ...otherProps }: ModalHeaderTitleProps) => (
  <S.TitleScroller {...otherProps}>
    <S.Title id={id} size="extraLarge">
      {title}
    </S.Title>
  </S.TitleScroller>
));
