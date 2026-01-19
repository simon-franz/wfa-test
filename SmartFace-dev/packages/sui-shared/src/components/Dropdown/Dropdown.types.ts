import type { FloatDirection } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

export type DropdownProps = {
  placement?: FloatDirection;
} & HTMLAttributes<HTMLDivElement>;
