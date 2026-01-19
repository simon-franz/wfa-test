import type { HTMLAttributes } from 'react';

export type FontAwesomeIconProps = {
  name: string;
  variant?:
    | 'brands'
    | 'duotone'
    | 'light'
    | 'regular'
    | 'sharp-duotone'
    | 'sharp-light'
    | 'sharp-regular'
    | 'sharp-solid'
    | 'sharp-thin'
    | 'solid'
    | 'thin';
} & HTMLAttributes<SVGSVGElement>;
