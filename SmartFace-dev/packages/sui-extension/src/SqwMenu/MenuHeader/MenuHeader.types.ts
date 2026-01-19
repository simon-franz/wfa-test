import type { HTMLAttributes } from 'react';

import type { SqwMenuProps } from '../SqwMenu.types';

export type MenuHeaderProps = HTMLAttributes<HTMLDivElement> &
  Pick<SqwMenuProps, 'title' | 'portrait' | 'onPortraitAction' | 'subtitle'>;
