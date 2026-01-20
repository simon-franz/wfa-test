import { useCallback } from 'react';
import { useReactFlow, type Node, type Edge } from '@xyflow/react';

interface LayoutOptions {
  direction?: 'LR' | 'TB'; // Left-to-Right or Top-to-Bottom
  nodeSpacing?: number;
  rankSpacing?: number;
}

/**
 * Simple auto-layout hook for horizontal workflow arrangement
 * Uses a basic layering algorithm without external dependencies
 */
export function useAutoLayout() {
  const { getNodes, getEdges, setNodes } = useReactFlow();

  const applyAutoLayout = useCallback(
    (options: LayoutOptions = {}) => {
      const {
        direction = 'LR',
        nodeSpacing = 150,
        rankSpacing = 250,
      } = options;

      const nodes = getNodes();
      const edges = getEdges();

      if (nodes.length === 0) return;

      // Build adjacency list
      const adjacencyList = new Map<string, string[]>();
      const inDegree = new Map<string, number>();

      nodes.forEach((node) => {
        adjacencyList.set(node.id, []);
        inDegree.set(node.id, 0);
      });

      edges.forEach((edge) => {
        const sourceId = edge.source;
        const targetId = edge.target;
        adjacencyList.get(sourceId)?.push(targetId);
        inDegree.set(targetId, (inDegree.get(targetId) || 0) + 1);
      });

      // Topological sort to determine layers (ranks)
      const layers: string[][] = [];
      const queue: string[] = [];
      const nodeToLayer = new Map<string, number>();

      // Find all nodes with no incoming edges (start nodes)
      nodes.forEach((node) => {
        if (inDegree.get(node.id) === 0) {
          queue.push(node.id);
          nodeToLayer.set(node.id, 0);
        }
      });

      // If no start nodes, pick the first node
      if (queue.length === 0 && nodes.length > 0) {
        queue.push(nodes[0].id);
        nodeToLayer.set(nodes[0].id, 0);
      }

      // Process nodes layer by layer
      while (queue.length > 0) {
        const currentLayerSize = queue.length;
        const currentLayer: string[] = [];

        for (let i = 0; i < currentLayerSize; i++) {
          const nodeId = queue.shift()!;
          const layer = nodeToLayer.get(nodeId) || 0;

          // Add to current layer
          if (!layers[layer]) layers[layer] = [];
          layers[layer].push(nodeId);
          currentLayer.push(nodeId);

          // Process neighbors
          const neighbors = adjacencyList.get(nodeId) || [];
          neighbors.forEach((neighborId) => {
            const currentInDegree = inDegree.get(neighborId) || 0;
            inDegree.set(neighborId, currentInDegree - 1);

            if (inDegree.get(neighborId) === 0) {
              const neighborLayer = layer + 1;
              nodeToLayer.set(neighborId, neighborLayer);
              queue.push(neighborId);
            }
          });
        }
      }

      // Handle disconnected nodes
      nodes.forEach((node) => {
        if (!nodeToLayer.has(node.id)) {
          const lastLayer = layers.length;
          if (!layers[lastLayer]) layers[lastLayer] = [];
          layers[lastLayer].push(node.id);
          nodeToLayer.set(node.id, lastLayer);
        }
      });

      // Calculate positions
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      const layoutedNodes: Node[] = [];

      layers.forEach((layer, layerIndex) => {
        const layerHeight = layer.length * nodeSpacing;
        const startY = -layerHeight / 2;

        layer.forEach((nodeId, indexInLayer) => {
          const node = nodeMap.get(nodeId);
          if (!node) return;

          const x = direction === 'LR' ? layerIndex * rankSpacing : startY + indexInLayer * nodeSpacing;
          const y = direction === 'LR' ? startY + indexInLayer * nodeSpacing : layerIndex * rankSpacing;

          layoutedNodes.push({
            ...node,
            position: { x, y },
          });
        });
      });

      setNodes(layoutedNodes);
    },
    [getNodes, getEdges, setNodes],
  );

  return { applyAutoLayout };
}
