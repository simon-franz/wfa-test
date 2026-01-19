import type { HTMLAttributes } from 'react';

import type { ProgressProps } from '../Progress.types';

export type ProgressLinearProps = Omit<ProgressProps, 'presentation'> & HTMLAttributes<HTMLDivElement>;
