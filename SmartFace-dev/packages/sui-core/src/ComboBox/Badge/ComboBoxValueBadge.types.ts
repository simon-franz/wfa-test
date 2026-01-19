import type { SetRequired } from 'type-fest';

import type { BadgeProps } from '../../Badge/Badge.types';

export type ComboBoxValueBadgeProps = {
  focused?: boolean;
} & SetRequired<Omit<BadgeProps, 'children'>, 'text' | 'id'>;
