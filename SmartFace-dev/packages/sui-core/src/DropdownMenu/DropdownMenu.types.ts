import type { FloatDirection, Presentation } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes, ReactNode } from 'react';

export type DropdownMenuProps = {
  // eslint-disable-next-line @stylistic/ts/object-curly-newline
  trigger: ReactNode | ((triggerProps: { open: boolean }) => ReactNode);
  items: ReactNode;
  placement?: FloatDirection;
  presentation?: Presentation;
  title?: string;
} & HTMLAttributes<HTMLElement>;
