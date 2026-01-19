import styled from '@emotion/styled';
import { mq } from '@hrworks/design-system';

import { S as TreeNodeStyles } from '../TreeNode/TreeNode.styles';

const Container = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.marko.variables.spacing.distance.medium,
  [mq.print]: {
    display: 'none',
  },
}));

const ControlPanel = styled(TreeNodeStyles.Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  padding: theme.marko.variables.spacing.distance.medium,
}));

export const S = {
  Container,
  ControlPanel,
} as const;
