import type { HTMLAttributes } from 'react';

import type { ProfileMenuProps } from '../ProfileMenu.types';

export type ProfileMenuHeaderProps = HTMLAttributes<HTMLDivElement> &
  Pick<ProfileMenuProps, 'portrait' | 'subtitle' | 'title'>;
