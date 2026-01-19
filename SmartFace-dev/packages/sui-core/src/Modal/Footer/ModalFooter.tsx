import { observer } from 'mobx-react';

import { S } from './ModalFooter.styles';
import type { ModalFooterProps } from './ModalFooter.types';

export const ModalFooter = observer((props: ModalFooterProps) => <S.Footer {...props} />);
