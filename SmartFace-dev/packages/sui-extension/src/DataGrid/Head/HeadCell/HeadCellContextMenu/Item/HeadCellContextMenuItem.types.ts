import type { HTMLAttributes } from 'react';

import type { IconProps } from '@hrworks/sui-core/Icon/Icon.types';

export type HeadCellContextMenuItemProps = {
  iconName?: IconProps['name'];
} & HTMLAttributes<HTMLLIElement>;
