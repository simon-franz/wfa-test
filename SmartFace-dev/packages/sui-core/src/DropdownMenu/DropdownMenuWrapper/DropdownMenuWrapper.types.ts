import type { HTMLAttributes, Ref } from 'react';

export type DropdownMenuWrapperProps = {
  submenu?: boolean;
  ref: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>;
