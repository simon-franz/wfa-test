import { observer } from 'mobx-react';

import { S } from './ModalHeader.styles';
import type { ModalHeaderProps } from './ModalHeader.types';

export const ModalHeader = observer(({ ...props }: ModalHeaderProps) => <S.Header {...props} />);
