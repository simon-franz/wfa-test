import type { SVGAttributes } from 'react';

export type BooleanDataProps = {
  value: unknown;
} & Omit<SVGAttributes<HTMLOrSVGElement>, 'name'>;
