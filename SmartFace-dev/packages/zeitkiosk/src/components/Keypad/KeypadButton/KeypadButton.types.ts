import type { IconButtonProps } from '@hrworks/sui-core/IconButton/IconButton.types';

export type KeypadButtonProps = {
  $isZero?: boolean;
  $isBackspace?: boolean;
} & IconButtonProps;
