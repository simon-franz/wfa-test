import type { HTMLAttributes } from 'react';

import type { IconButtonProps } from '@hrworks/sui-core/IconButton/IconButton.types';

export type RotateImageButtonProps = IconButtonProps & {
  direction: 'left' | 'right';
  onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>;
