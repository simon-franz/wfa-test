import { type Edge, type Node, Position } from '@xyflow/react';
import { flextree, type FlextreeNode } from 'd3-flextree';
import { useCallback, useEffect, useRef, useState } from 'react';

import { S as GroupNodeStyles } from '../TreeGraph/GroupNode/GroupNode.styles';
import type { TreeGraphEntry } from './TreeGraph.types';

type Data = {
  data: TreeGraphEntry;
};

type GenericData<Data> = {
  data: Data;
};

export const useTreeLayout = (
  entries: TreeGraphEntry[],
  leafGroupingThreshold: number | boolean,
  nodeWidth: number,
) => {
  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);
  const [layoutedEdges, setLayoutedEdges] = useState<Edge[]>([]);

  const nodeHeight = 255; // nodeHeight may vary. This number just works for the treeLayout generation
  const groupNodeWidthPerNode =
    GroupNodeStyles.componentConfig.childNodeWidth + GroupNodeStyles.componentConfig.childNodePadding! * 2;
  const groupHeight = 175; // groupHeight may vary. This number just works for the treeLayout generation
  const highestNode = useRef<number>(230);

  const createLayout = useCallback(
    (rootData: FlextreeNode<unknown>) => {
      // generate the size based on grouped or not grouped
      const nodeSize = (d: GenericData<unknown>): [number, number] => {
        const nodeData = (d.data as Data).data;
        if (nodeData.isGrouped && nodeData.groupedEntries) {
          const entriesPerRow = 4;
          const nrOfEntries = nodeData.groupedEntries.length;
          const groupedNodeWidth = nrOfEntries < 4 ? nrOfEntries * groupNodeWidthPerNode : groupNodeWidthPerNode * 4;
          const numRows = Math.ceil(nodeData.groupedEntries.length / entriesPerRow);
          const height = numRows * groupHeight;
          if (height > highestNode.current) {
            highestNode.current = height;
          }

          return [groupedNodeWidth, height];
        }

        return [nodeWidth, nodeHeight];
      };

      // generate the layout
      const layout = flextree({
        spacing(node) {
          const typedNode = node as FlextreeNode<Data>;
          if (typedNode.data.data.isGrouped) {
            return 120;
          }

          return 40;
        },
      }).nodeSize(nodeSize);

      // Convert to hierarchy and apply layout
      const hierarchyRoot = layout.hierarchy(rootData);
      layout(hierarchyRoot);

      const layoutedNodes: Node[] = [];
      const layoutedEdges: Edge[] = [];

      hierarchyRoot.each((node: FlextreeNode<unknown>) => {
        // Access data at the correct level
        if (node.depth === 0) return; // Skip the synthetic root and its direct children
        const typedNode = node as FlextreeNode<Data>;
        const nodeData = typedNode.data.data;
        const id = nodeData.id;

        // Check if the node is a grouped node and adjust its x-coordinate
        let adjustedX = node.x;
        if (nodeData.isGrouped && nodeData.groupedEntries) {
          const columns = nodeData.groupedEntries.length >= 4 ? 4 : nodeData.groupedEntries.length;
          const adjustment =
            (GroupNodeStyles.componentConfig.childNodeWidth * columns) / 2 +
            GroupNodeStyles.componentConfig.childNodePadding! * 2.5; // Makes no sense but works
          adjustedX -= adjustment;
        } else {
          const adjustment = nodeWidth / 2;
          adjustedX -= adjustment;
        }

        layoutedNodes.push({
          id,
          type: nodeData.isGrouped ? 'groupNode' : 'treeNode',
          position: { x: adjustedX, y: node.y },
          data: nodeData,
          targetPosition: Position.Top,
          sourcePosition: Position.Bottom,
        });

        if (typedNode.parent) {
          const parentData = typedNode.parent.data.data;
          layoutedEdges.push({
            id: `edge-${parentData.id}-${id}`,
            source: parentData.id,
            target: id,
            type: 'treeEdge',
            focusable: false,
          });
        }
      });

      return { layoutedNodes, layoutedEdges };
    },
    [groupNodeWidthPerNode, nodeWidth],
  );

  const groupChildren = (node: TreeGraphEntry, maxChildren: number) => {
    // Filter leaf nodes and non-leaf nodes
    const leafNodes = node.entries?.filter(
      (child) => (!child.entries || child.entries.length === 0) && !child.onLoadChildEntries,
    );
    const nonLeafNodes = node.entries?.filter(
      (child) => (child.entries && child.entries.length > 0) || child.onLoadChildEntries,
    );

    // If the number of leaf nodes is below the threshold, return the node as is
    if (!leafNodes || !nonLeafNodes || leafNodes.length < maxChildren) {
      return node;
    }

    // Create one group node for all leaf nodes that exceed maxChildren
    const groupedNode = {
      id: `group-${node.id}`,
      entries: leafNodes,
      groupedEntries: leafNodes,
      type: 'groupNode',
      isGrouped: true,
    };

    // Combine non-leaf nodes and the new grouped node
    return { ...node, entries: [...nonLeafNodes, groupedNode] };
  };

  const groupTree = useCallback((nodes: TreeGraphEntry[], maxChildren: number): TreeGraphEntry[] => {
    return nodes.map((node) => {
      if (!node.entries) {
        return node; // Return leaf nodes as is
      }

      // Recursively group children of this node
      const groupedChildren = groupTree(node.entries, maxChildren);

      return groupChildren({ ...node, entries: groupedChildren }, maxChildren);
    });
  }, []);

  useEffect(() => {
    const pruneTree = (nodes: TreeGraphEntry[]): TreeGraphEntry[] =>
      nodes.map((node) => ({
        ...node,
        hasChildEntries: !!node.entries || !!node.onLoadChildEntries,
        entries: node.isExpanded && node.entries ? pruneTree(node.entries) : undefined,
      }));

    const intrepretThreshold = (threshold: number | boolean): number => {
      if (typeof threshold === 'boolean') {
        return threshold ? 2 : Number.POSITIVE_INFINITY;
      }

      return threshold > 2 ? threshold : 2;
    };

    const groupedEntries = groupTree(entries, intrepretThreshold(leafGroupingThreshold));

    // Array with all the trees without the invisible nodes
    const prunedEntries = pruneTree(groupedEntries);

    const syntheticRoot = {
      data: {},
      entries: prunedEntries,
      id: 'root',
    };

    const rootHierarchy = flextree({}).hierarchy(syntheticRoot, (d: unknown) => {
      const typedData = d as TreeGraphEntry;

      return typedData.entries;
    });

    const { layoutedNodes, layoutedEdges } = createLayout(rootHierarchy);

    setLayoutedNodes(layoutedNodes);
    setLayoutedEdges(layoutedEdges);
  }, [createLayout, entries, groupTree, leafGroupingThreshold, nodeWidth]);

  return { layoutedNodes, layoutedEdges };
};
