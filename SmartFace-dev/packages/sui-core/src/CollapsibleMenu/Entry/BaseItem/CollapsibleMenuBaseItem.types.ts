import type { ReactNode } from 'react';

import type { CollapsibleMenuEntryProps } from '../CollapsibleMenuEntry.types';

export type BaseItemProps = {
  expandToggleChildren?: ReactNode;
  isNotClickable?: boolean;
} & CollapsibleMenuEntryProps;
