import styled from '@emotion/styled';
import _Button from '@hrworks/sui-core/Button';

import { S as HeadCellStyles } from '../../../Head/HeadCell/HeadCell.styles';

const Wrapper = styled.div({
  display: 'inline-block',
});

const Button = styled(_Button)(({ theme }) => ({
  ...theme.sqwTier2Typography.labelMdSemibold,
  gap: theme.marko.variables.spacing.distance.extraSmall,
  padding: '5px 10px',

  ...HeadCellStyles.generateInteractiveStyle(theme),
}));

const Icon = styled.span({
  display: 'flex',
  width: '1em',
  height: '1em',
});

export const S = {
  Wrapper,
  Button,
  Icon,
} as const;
