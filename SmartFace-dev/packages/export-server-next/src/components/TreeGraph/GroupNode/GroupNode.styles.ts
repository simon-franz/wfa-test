import styled from '@emotion/styled';
import { Handle as ReactFlowHandle } from '@xyflow/react';

import { S as TreeNodeStyles } from '../TreeNode/TreeNode.styles';

const componentConfig = {
  childNodeWidth: 145,
  childNodePadding: 10,
};

const Wrapper = styled.div<{
  columns: number;
  allGreyedOut?: boolean;
}>(({ columns, allGreyedOut }) => ({
  width: columns * componentConfig.childNodeWidth,
  ...(allGreyedOut && {
    opacity: 0.5,
  }),
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

const ChildNode = styled.div([
  {
    padding: componentConfig.childNodePadding,
    overflow: 'hidden',
  },
]);

export const S = {
  componentConfig,
  Wrapper,
  Handle,
  Grid,
  ChildNode,
} as const;
