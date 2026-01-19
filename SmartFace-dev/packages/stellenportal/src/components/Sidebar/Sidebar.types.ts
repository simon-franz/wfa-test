import type { HTMLAttributes } from 'react';

import type { PostWithPostOffer } from '../../types/post';
import type { Settings } from '../../types/settings';

export type SidebarProps = {
  post: PostWithPostOffer;
  settings: Settings;
} & HTMLAttributes<HTMLDivElement>;
