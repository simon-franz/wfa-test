import '@xyflow/react/dist/style.css';

import { useTheme } from '@emotion/react';
import { ERROR_CODES, ErrorHandlingContext } from '@hrworks/error-handling';
import { LocalizationContext } from '@hrworks/localization';
import type { TreeGraphActionEventType } from '@hrworks/smartface/main/lib/EventController';
import { BlockUI } from '@hrworks/sui-core/BlockUI';
import Modal from '@hrworks/sui-core/Modal';
import { ServiceContext } from '@hrworks/sui-shared/components/ServiceProvider/ServiceContext';
import { replacePlaceholder } from '@hrworks/sui-shared/functions/replacePlaceholder';
import {
  type Edge,
  type Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import axios, { isAxiosError } from 'axios';
import { observer } from 'mobx-react';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

import {
  EXPORT_LIMIT_DEFAULT,
  EXPORT_SERVER_MAX_PAYLOAD,
  FIT_VIEW_PADDING,
  LEAF_GROUPING_THRESHOLD_LIMIT,
  MIN_ZOOM,
  NODE_ANIMATION_DURATION,
  NODE_WIDTH,
} from './constants';
import { GroupNode } from './GroupNode';
import { PrintOverlay } from './PrintOverlay';
import { TreeEdge } from './TreeEdge/TreeEdge';
import { S } from './TreeGraph.styles';
import type { ExportAction, NodeWithHandles, TreeGraphProps } from './TreeGraph.types';
import { TreeGraphContext } from './TreeGraphContext';
import { TreeGraphControls } from './TreeGraphControl';
import { TreeNode } from './TreeNode';
import { useTreeLayout } from './useTreeLayout';

import './PrintOverlay/printing.css';

const nodeTypes = {
  treeNode: TreeNode,
  groupNode: GroupNode,
};

const edgeTypes = {
  treeEdge: TreeEdge,
};

export const TreeGraph = observer(
  ({
    entries,
    showMiniMap,
    showControls,
    controlsChildren,
    leafGroupingThreshold = LEAF_GROUPING_THRESHOLD_LIMIT,
    exportLimit = EXPORT_LIMIT_DEFAULT,
    exportServiceUrl,
    ...otherProps
  }: TreeGraphProps) => {
    const { log } = useContext(ErrorHandlingContext);
    const reactFlowInstance = useReactFlow();
    const printRef = useRef<HTMLDivElement>(null);
    const [shouldPrint, setShouldPrint] = useState(false);
    const [modalText, setModalText] = useState({ title: '', body: '' });
    const [printImg, setPrintImg] = useState('');
    const [isExporting, setIsExporting] = useState(false);
    const orientationRef = useRef<'portrait' | 'landscape'>('portrait');
    const currentTheme = useTheme();

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const validatedExportLimit = exportLimit < 0 ? 0 : exportLimit;

    const { serviceToken, treeGraphExportServiceUrl } = useContext(ServiceContext);
    const { translate } = useContext(LocalizationContext);
    const _exportServiceUrl = exportServiceUrl || treeGraphExportServiceUrl;

    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

    const { layoutedNodes, layoutedEdges } = useTreeLayout(entries, leafGroupingThreshold, NODE_WIDTH);

    const lastInteractedNodeId = useRef<string | null>(null);
    const lastNodeCount = useRef<number>(0);

    const navigateToNodeById = useCallback(
      async (id: string | null) => {
        if (layoutedNodes) {
          // check lastNodeCount to check if layout has changed:
          if (layoutedNodes.length === lastNodeCount.current) {
            return;
          }
          lastNodeCount.current = layoutedNodes.length;
          const node = layoutedNodes.find((n) => n.id === id);

          // If the node is found, center the viewport on this node
          if (node) {
            const zoom = reactFlowInstance.getZoom(); // keep the current zoom
            const position = node.position;
            delay(NODE_ANIMATION_DURATION); // Wait till the nodes are in position
            reactFlowInstance.setCenter(position.x + NODE_WIDTH / 2, position.y, {
              duration: 300,
              zoom,
            });
          } else {
            // If the node doesn't exist, adjust the viewport to fit all new nodes
            // This adjustment accounts for backend manipulations removing / replacing nodes
          }
        }
      },
      [layoutedNodes, reactFlowInstance],
    );

    useEffect(() => {
      setNodes(layoutedNodes || []);
      setEdges(layoutedEdges || []);
      navigateToNodeById(lastInteractedNodeId.current);
    }, [layoutedEdges, layoutedNodes, navigateToNodeById, setEdges, setNodes]);

    const sanitizeFilename = (filename: string): string => {
      const sanitizedFilename = filename.replaceAll(/[^\s\w.-]/g, '');

      return sanitizedFilename.replaceAll(/\s+/g, '_');
    };

    const handlePrint = useReactToPrint({
      contentRef: printRef,
      preserveAfterPrint: true, // Necessary for iOS Printing
      onAfterPrint: () => {
        setPrintImg('');
        setIsExporting(false);
      },
    });

    useEffect(() => {
      if (shouldPrint) {
        handlePrint();
        setShouldPrint(false);
      }
    }, [shouldPrint, handlePrint]);

    const handleError = useCallback(
      async (error: unknown, showErrorModal?: boolean) => {
        let errorMessage = translate('tree-graph-export-error-message');

        if (error && isAxiosError(error)) {
          if (error.response?.data) {
            try {
              const errorJSON = await error.response.data.text();
              const errorData = JSON.parse(errorJSON);
              const errorText = errorData.error;
              if (errorText?.includes('Too many nodes')) {
                errorMessage = translate('tree-graph-export-too-many-nodes');
              }
            } catch (parseError) {
              console.error('Failed to parse error response:', parseError);
            }
          }
        } else {
          log({
            type: 'error',
            code: ERROR_CODES.EXPORT_SERVER_ERROR,
            error: error instanceof Error ? error : new Error('Error export via the Export server'),
          });
        }

        if (showErrorModal) {
          setModalText({
            title: translate('tree-graph-export-error-title'),
            body: errorMessage,
          });
        }
      },
      [log, translate],
    );

    // to check if the action is an export
    const isExportAction = useCallback((action: string): action is ExportAction => {
      return ['export-as-png', 'export-as-jpeg', 'export-as-svg', 'export-as-pdf', 'print'].includes(action);
    }, []);

    const getPayloadSize = (payload: unknown) => {
      const jsonString = JSON.stringify(payload);

      return new Blob([jsonString]).size;
    };

    const exportFlowElement = useCallback(
      async (action: ExportAction, fileName: string) => {
        if (!_exportServiceUrl) {
          return;
        }
        // Get the Bounds of the nodes to set the viewport on the server.
        // Add handles to the nodes so that they can be rendered on the server.
        const nodes = reactFlowInstance.getNodes() as NodeWithHandles[];
        const nodesBounds = reactFlowInstance.getNodesBounds(nodes);

        // Breaking change with v12: height & width stored in measured.height | measured.width
        const nodesWithHeightAndWidth: NodeWithHandles[] = [];
        nodes.forEach((node) => {
          if (!node.measured?.height || !node.measured.width) {
            return;
          }
          nodesWithHeightAndWidth.push({ ...node, height: node.measured.height, width: node.measured.width });
        });

        nodesWithHeightAndWidth.forEach((node) => {
          if (node.data.onLoadChildEntries) {
            node.data.hasChildEntries = true;
          }
          node.handles = [
            { type: 'source', position: Position.Bottom, x: node.width / 2, y: node.height },
            { type: 'target', position: Position.Top, x: node.width / 2, y: 0 },
          ];
        });

        const payload = {
          nodes: nodesWithHeightAndWidth,
          edges,
          width: nodesBounds.width,
          height: nodesBounds.height + 50, // In some cases we need extra space cause the calculation is broken
          format: action,
        };

        if (getPayloadSize(payload) > EXPORT_SERVER_MAX_PAYLOAD) {
          setModalText({
            title: translate('tree-graph-export-error-title'),
            body: translate('tree-graph-export-too-many-nodes'),
          });

          return;
        }

        setIsExporting(true);
        try {
          const response = await axios.post(_exportServiceUrl, payload, {
            headers: {
              // Include the JWT in the Authorization header
              Authorization: `Bearer ${serviceToken}`,
            },
            responseType: 'blob',
          });
          const url = URL.createObjectURL(response.data);
          if (action === 'print') {
            setPrintImg(url);
            setShouldPrint(true);
          } else {
            downloadImage(url, fileName, action.split('-')[2]);
          }
          setIsExporting(false);
        } catch (error) {
          handleError(error, true);
          setIsExporting(false);
        }
      },
      [_exportServiceUrl, edges, handleError, reactFlowInstance, serviceToken, translate],
    );

    const onAction = useCallback(
      async (event: TreeGraphActionEventType) => {
        if (layoutedNodes?.length > validatedExportLimit) {
          setModalText({
            title: translate('tree-graph-export-limit-exceeded-title'),
            body: replacePlaceholder(translate('tree-graph-export-limit-exceeded-body-2'), {
              '%1%': validatedExportLimit,
              '%2%': layoutedNodes?.length,
            }),
          });

          return;
        }

        const filename = event.detail.filename
          ? sanitizeFilename(event.detail.filename)
          : translate('tree-graph-export-default-filename');

        const { action } = event.detail;
        const isValidExportAction = isExportAction(action);
        const flowElement = document.querySelector('.react-flow__viewport') as HTMLElement | null;

        // if targetSfId is not defined or it's not a valid action return
        if (!isValidExportAction || !flowElement) {
          return;
        }

        const nodesBounds = reactFlowInstance.getNodesBounds(nodes);
        nodesBounds.width > nodesBounds.height
          ? (orientationRef.current = 'landscape')
          : (orientationRef.current = 'portrait');

        await exportFlowElement(action, filename);
      },
      [
        layoutedNodes?.length,
        validatedExportLimit,
        translate,
        isExportAction,
        reactFlowInstance,
        nodes,
        exportFlowElement,
      ],
    );

    useEffect(() => {
      window.addEventListener('tree-graph-action' as any, onAction);

      return () => {
        window.removeEventListener('tree-graph-action' as any, onAction);
      };
    }, [onAction]);

    const downloadImage = (dataUrl: string, filename: string, fileExtension: string) => {
      const a = document.createElement('a');
      a.setAttribute('download', `${filename}.${fileExtension}`);
      a.setAttribute('href', dataUrl);
      a.click();
    };

    const setLastInteractedNodeId = (id: string) => {
      lastInteractedNodeId.current = id;
    };

    const treeGraphContextValue = useMemo(
      () => ({
        lastInteractedNodeId: lastInteractedNodeId.current,
        setLastInteractedNodeId,
      }),
      [],
    );

    return (
      <TreeGraphContext.Provider value={treeGraphContextValue}>
        <S.Container className="flow-wrapper" {...otherProps}>
          {isExporting && <BlockUI isOpen />}
          <Modal
            show={!!modalText.title}
            onClose={() => setModalText({ title: '', body: '' })}
            closeable
            title={modalText.title}
          >
            {modalText.body}
          </Modal>
          <PrintOverlay orientation={orientationRef.current} ref={printRef} printImg={printImg} />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            minZoom={MIN_ZOOM}
            nodesConnectable={false}
            nodesDraggable={false}
            edgesFocusable={false}
            proOptions={{ account: 'paid-pro', hideAttribution: true }}
            fitView
            fitViewOptions={{ padding: FIT_VIEW_PADDING }}
          >
            {showMiniMap && (
              <S.MiniMap
                pannable
                zoomable
                zoomStep={1}
                nodeBorderRadius={currentTheme.marko.variables.borderRadius.small}
                maskColor={currentTheme.sqwTier2Color.surface.structure}
                nodeColor={currentTheme.sqwTier2Color.background.neutral.subtle.default}
                bgColor={currentTheme.sqwTier2Color.surface.sunken}
                position="bottom-left"
              />
            )}
            <TreeGraphControls
              controlsChildren={controlsChildren}
              showControls={!!showControls}
              reactFlowInstance={reactFlowInstance}
            />
          </ReactFlow>
        </S.Container>
      </TreeGraphContext.Provider>
    );
  },
);

export const TreeGraphWithProvider = observer((props: TreeGraphProps) => (
  <ReactFlowProvider>
    <TreeGraph {...props} />
  </ReactFlowProvider>
));
