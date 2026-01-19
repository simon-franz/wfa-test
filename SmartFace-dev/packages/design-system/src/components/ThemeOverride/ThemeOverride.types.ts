import type { HTMLAttributes } from 'react';

import type { Theme } from '../../types';

export type ThemeOverrideProps = {
  theme: Exclude<Theme, 'system'>;
} & Pick<HTMLAttributes<HTMLElement>, 'children'>;
