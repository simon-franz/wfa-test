import { observer } from 'mobx-react';

import { S } from './ModalHeaderCloseButton.styles';
import type { ModalHeaderCloseButtonProps } from './ModalHeaderCloseButton.types';

export const ModalHeaderCloseButton = observer((props: ModalHeaderCloseButtonProps) => (
  <S.CloseButton size="small" corner="rounded" variant="subtle" color="secondary" {...props} />
));
