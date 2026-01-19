import { observer } from 'mobx-react';

import { S } from './ModalContent.styles';
import type { ModalContentProps } from './ModalContent.types';

export const ModalContent = observer((props: ModalContentProps) => <S.Content {...props} />);
