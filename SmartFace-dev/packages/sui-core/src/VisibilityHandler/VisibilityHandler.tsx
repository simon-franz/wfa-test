import { observer } from 'mobx-react';

import { S } from './VisibilityHandler.styles';
import type { VisibilityHandlerProps } from './VisibilityHandler.types';

export const VisibilityHandler = observer(({ visible = true, children, ...otherProps }: VisibilityHandlerProps) => {
  return (
    <S.VisibilityWrapper visible={visible} {...otherProps}>
      {children}
    </S.VisibilityWrapper>
  );
});
