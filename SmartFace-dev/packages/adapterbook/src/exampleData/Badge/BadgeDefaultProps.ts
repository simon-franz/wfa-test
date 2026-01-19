import { generateProps } from '@hrworks/adapterbook/utils/generateProps';

import { defaultButton } from '../Button/ButtonDefaultProps';
import type { BadgeBackendProps } from '@hrworks/smartface/adapters/core/BadgeAdapter/BadgeAdapter.types';

export const badgeDefaultProps: BadgeBackendProps = {
  anchor: defaultButton(),
  variant: 'filled',
  text: '5',
  corner: 'rounded',
  size: 'large',
  dot: false,
  color: 'success',
  fullWidth: false,
  fixedSize: false,
  animation: 'none',
};

export const defaultBadge = (props?: BadgeBackendProps) => {
  const { anchor, ...otherDefaultProps } = badgeDefaultProps;

  return generateProps('Badge', { ...otherDefaultProps, ...props });
};
