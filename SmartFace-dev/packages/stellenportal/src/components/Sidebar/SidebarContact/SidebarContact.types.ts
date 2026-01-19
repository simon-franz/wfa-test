import type { HTMLAttributes } from 'react';

import type { Post } from '../../../types/post';

export type SidebarContactProps = {
  contactInformation?: Post['contactInformation'];
} & HTMLAttributes<HTMLDivElement>;
