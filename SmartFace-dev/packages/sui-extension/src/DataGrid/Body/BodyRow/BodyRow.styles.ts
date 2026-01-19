import styled from '@emotion/styled';
import { shouldForwardProp } from '@hrworks/design-system/emotionUtils';

import { ExpansionButton as _ExpansionButton } from '../../util/ExpansionButton';
import { BodyCell as _BodyCell } from '../BodyCell';

const Row = styled.div({
  display: 'contents',
  backgroundColor: 'inherit',
});

const BodyCell = styled(_BodyCell)({
  overflow: 'visible',
});

const GroupingCell = styled.div<{
  rowDepth: number;
}>(({ rowDepth }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  maxWidth: '100%',
  paddingLeft: `${rowDepth}em`,
}));

const ExpansionButton = styled(_ExpansionButton, {
  shouldForwardProp,
})<{
  $rowDepth: number;
}>(({ $rowDepth }) => ({
  left: `${$rowDepth - 1.5}em`,
  overflow: 'visible',
}));

export const S = {
  Row,
  BodyCell,
  GroupingCell,
  ExpansionButton,
} as const;
