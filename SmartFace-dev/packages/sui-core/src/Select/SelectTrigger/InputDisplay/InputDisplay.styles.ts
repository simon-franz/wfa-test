import styled from '@emotion/styled';
import { overflowEllipsis } from '@hrworks/design-system';

const Label = styled.div(overflowEllipsis);

export const S = {
  Label,
} as const;
