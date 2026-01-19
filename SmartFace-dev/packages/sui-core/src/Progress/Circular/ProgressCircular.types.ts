import type { SVGAttributes } from 'react';

import type { ProgressProps } from '../Progress.types';

export type ProgressCircularProps = Omit<ProgressProps, 'presentation' | 'size'> & SVGAttributes<SVGSVGElement>;
