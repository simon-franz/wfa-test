import type { HTMLAttributes } from 'react';

import type { Settings } from '../../types/settings';

export type CompanyMediaProps = {
  settings: Settings;
} & HTMLAttributes<HTMLDivElement>;
