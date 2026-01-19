import type { HTMLAttributes } from 'react';

export type SVGIconProps = {
  src: string;
  wrapper?: 'svg' | 'span';
} & HTMLAttributes<SVGSVGElement>;

/*
   It's Not easy to use the correct type from react-svg together with emotion and React
   so we only expose what we (might) need and type it manually
*/
