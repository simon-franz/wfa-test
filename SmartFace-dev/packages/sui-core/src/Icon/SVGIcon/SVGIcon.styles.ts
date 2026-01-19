import styled from '@emotion/styled';
import { ReactSVG } from 'react-svg';

const StyledReactSvg = styled(ReactSVG as any)({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  fill: 'currentcolor',
});

export const S = {
  StyledReactSvg,
} as const;
