import { observer } from 'mobx-react';

import { S } from './DropdownMenuDivider.styles';
import type { DropdownMenuDividerProps } from './DropdownMenuDivider.types';

export const DropdownMenuDivider = observer((props: DropdownMenuDividerProps) => <S.Divider {...props} />);
