import { ReactFlow } from '@xyflow/react';

import { GroupNode } from './GroupNode/GroupNode';
import { TreeEdge } from './TreeEdge/TreeEdge';
import { S } from './TreeGraph.styles';
import type { TreeGraphServerData } from './TreeGraph.types';
import { TreeGraphContext } from './TreeGraphContext';
import { TreeNode } from './TreeNode/TreeNode';

import { css } from './css';

const nodeTypes = {
  treeNode: TreeNode,
  groupNode: GroupNode,
};

const edgeTypes = {
  treeEdge: TreeEdge,
};

type TreeGraphPropsType = Omit<TreeGraphServerData, 'format'>;

export const TreeGraph = ({
  nodes,
  edges,
  highlightColor = '#f00',
  width,
  height,
  ...otherProps
}: TreeGraphPropsType) => {
  return (
    <TreeGraphContext.Provider value={{ highlightColor: highlightColor }}>
      <S.Wrapper style={{ width, height }} {...otherProps}>
        <style>{css}</style>
        <ReactFlow
          nodes={nodes as any}
          edges={edges as any}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
          width={width}
          height={height}
        />
      </S.Wrapper>
    </TreeGraphContext.Provider>
  );
};
