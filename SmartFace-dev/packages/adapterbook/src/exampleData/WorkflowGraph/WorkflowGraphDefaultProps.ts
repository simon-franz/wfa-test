import { generateLoremWords } from '@hrworks/sui-shared/functions/stringGenerator';

import { addNotification } from '../../utils/eventFunctions/addNotification';
import type { WorkflowGraphBackendProps } from '@hrworks/smartface/adapters/extension/WorkflowGraphAdapter/WorkflowGraphAdapter.types';

const nodeTextArray = ['Senior', 'Expert', 'Teamlead', 'Manager'];
const getNodes = (nodeTextArray: string[]) => {
  return nodeTextArray.map((nodeText) => {
    return {
      props: {
        componentChildren: [
          {
            props: {
              text: nodeText,
            },
            sfId: `${nodeText}-node-text` as const,
            sfComponent: 'Text' as const,
          },
        ],
      },
      sfId: `${nodeText}-node`,
    };
  });
};

export const workflowGraphDefaultProps: WorkflowGraphBackendProps = {
  fullHeight: false,
  direction: 'BT',
  defaultNodeSize: 'medium',
  defaultNodeColor: 'secondary',
  defaultEdgeColor: 'primary',
  nodes: [
    ...getNodes(nodeTextArray),
    {
      props: {
        componentChildren: [{ props: { text: 'Circular Relationship' }, sfComponent: 'Text', sfId: 'circular-text' }],
      },
      sfId: 'Circular',
    },
  ],
  edges: [
    {
      props: {
        sourceNodeSfId: 'Senior-node',
        targetNodeSfId: 'Expert-node',
        onClick: [addNotification()],
        label: generateLoremWords(),
      },
      sfId: 'edge-1',
    },
    {
      props: {
        sourceNodeSfId: 'Senior-node',
        targetNodeSfId: 'Teamlead-node',
        label: 'Edge Label',
      },
      sfId: 'edge-2',
    },
    {
      props: {
        sourceNodeSfId: 'Teamlead-node',
        targetNodeSfId: 'Expert-node',
        sourceHandle: 'sideways',
        targetHandle: 'sideways',
        markerStart: 'arrow',
        markerEnd: 'arrow',
        label: generateLoremWords(),
        onClick: [addNotification()],
      },
      sfId: 'edge-3',
    },
    {
      props: {
        color: 'primary',
        sourceNodeSfId: 'Manager-node',
        targetNodeSfId: 'Manager-node',
        sourceHandle: 'right',
        targetHandle: 'top',
        label: generateLoremWords(),
        animated: true,
        onClick: [addNotification()],
      },
      sfId: 'edge-4',
    },
    {
      props: {
        sourceNodeSfId: 'Teamlead-node',
        targetNodeSfId: 'Manager-node',
        label: generateLoremWords(),
      },
      sfId: 'edge-5',
    },
    {
      props: {
        sourceNodeSfId: 'Circular',
        targetNodeSfId: 'Circular',
        sourceHandle: 'forward',
        targetHandle: 'forward',
        label: generateLoremWords(),
        onClick: [addNotification()],
      },
      sfId: 'edge-6',
    },
  ],
};
