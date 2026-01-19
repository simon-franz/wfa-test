import type { HTMLAttributes } from 'react';

import type { PermanentEstablishment } from '../../../types/post';

export type SidebarEstablishmentsProps = {
  permanentEstablishments: PermanentEstablishment[];
} & HTMLAttributes<HTMLDivElement>;
