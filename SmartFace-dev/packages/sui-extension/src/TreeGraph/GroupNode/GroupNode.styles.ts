import styled from '@emotion/styled';
import { Handle as ReactFlowHandle } from '@xyflow/react';

import { S as TreeNodeStyles } from '../TreeNode/TreeNode.styles';

const componentConfig = {
  childNodeWidth: 145, // when changing this also change adjustment in useTreeLayout (be careful - better not change at all)
  childNodePadding: 10, // has to be exactly 10. Don't change
};

const Container = styled.div<{
  columns: number;
}>(({ columns }) => ({
  width: columns * componentConfig.childNodeWidth,
  ':active': {
    cursor: 'grabbing',
  },
}));

const Handle = styled(ReactFlowHandle)({
  visibility: 'hidden',
});

const Grid = styled(TreeNodeStyles.Card)<{
  columns: number;
}>(({ columns }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  rowGap: 16,
  columnGap: 8,
  padding: 16,
}));

export const S = {
  Container,
  Handle,
  Grid,
  componentConfig,
} as const;
