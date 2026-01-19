import styled from '@emotion/styled';

import { SVGIcon } from '../Icon/SVGIcon';

const StyledSVGIcon = styled(SVGIcon)({
  '& svg': {
    width: '100%',
    height: '100%',
  },

  [`& svg path:not([fill='none']),
    & svg circle:not([fill='none']),
    & svg rect:not([fill='none']),
    & svg polygon:not([fill='none']),
    & svg line:not([fill='none']),
    & svg polyline:not([fill='none'])`]: {
    fill: 'currentColor',
  },

  "& svg [stroke]:not([stroke='none'])": {
    stroke: 'currentColor',
  },
});

export const S = {
  StyledSVGIcon,
} as const;
