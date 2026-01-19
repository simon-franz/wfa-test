import { DropdownMenuDivider } from '@hrworks/sui-core/DropdownMenu/DropdownMenuDivider';
import { observer } from 'mobx-react';

import type { DropdownMenuDividerAdapterProps } from './DropdownMenuDividerAdapter.types';

export const DropdownMenuDividerAdapter = observer((props: DropdownMenuDividerAdapterProps) => (
  <DropdownMenuDivider {...props} />
));
