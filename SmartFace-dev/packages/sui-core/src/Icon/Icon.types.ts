import type { IconSet } from '@hrworks/types/shared/UiTypes';
import type { HTMLAttributes } from 'react';

import type { fontAwesomeIconMap } from './';

export type IconProps = {
  name: keyof typeof fontAwesomeIconMap;
  iconSet?: IconSet;
} & HTMLAttributes<HTMLSpanElement | SVGSVGElement>;
