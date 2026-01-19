// @ts-check

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
} from '../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { imageFactory } from '../../../../shared/smartFaceComponentFactories/core/imageFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { textFactory } from '../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import {
  workflowGraphEdgeFactory,
  workflowGraphFactory,
  workflowGraphNodeFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/workflowGraphFactory.js';
import { getPlaceholderImage } from '../../../shared/getPlaceholderImage.js';
import { patchFactory } from '../shared/patchFactory.js';

const placeholderImg = getPlaceholderImage(100, 100);

const gridCat = [
  gridFactory({
    items: [
      gridItemFactory({
        componentChildren: [imageFactory({ src: placeholderImg, fullWidth: false }, 'image')],
      }),
    ],
  }),
];

/* const gridText = [
  gridFactory({
    alignItems: 'center',
    justifyContent: 'center',
    items: [
      gridItemFactory({
        componentChildren: [textFactory({ text: 'My Workflow', fontSize: 'medium' })],
      }),
    ],
  }),
]; */

const onClickEdge = [
  {
    type: 'request',
    data: {
      action: 'reflect',
      reflectedData: {
        sideEffects: [{ type: 'consoleMessage', message: 'OnClickEdge' }],
      },
    },
  },
  {
    type: 'request',
    data: {
      action: 'reflect',
      reflectedData: patchFactory([
        {
          targetSfId: 'expert-graph',
          operation: 'append',
          path: 'props.nodes',
          value: workflowGraphNodeFactory(
            {
              componentChildren: gridCat,
              size: 'extraLarge',
            },
            '22',
          ),
        },
      ]),
    },
  },
];

export const expertGraphJSON = workflowGraphFactory(
  {
    // fullHeight: true,

    nodes: [
      workflowGraphNodeFactory(
        {
          componentChildren: [textFactory({ text: 'Senior', fontSize: 'medium' })],
        },
        '1',
        'data-guide-test',
      ),
      workflowGraphNodeFactory(
        {
          componentChildren: [textFactory({ text: 'Expert', fontSize: 'medium' })],
        },
        '2',
      ),
      workflowGraphNodeFactory(
        {
          componentChildren: [textFactory({ text: 'Teamlead', fontSize: 'medium' })],
        },
        '3',
      ),
      workflowGraphNodeFactory(
        {
          componentChildren: [textFactory({ text: 'Manager', fontSize: 'medium' })],
        },
        '4',
      ),
      workflowGraphNodeFactory(
        {
          size: 'extraLarge',
          componentChildren: [textFactory({ text: 'Circular Relationship', fontSize: 'medium' })],
        },
        '5',
      ),
    ],
    edges: [
      workflowGraphEdgeFactory({
        sourceNodeSfId: '1',
        targetNodeSfId: '2',
        onClick: onClickEdge,
        label: 'Edge Label Edge Label Label Label Label Label',
      }),
      workflowGraphEdgeFactory({ sourceNodeSfId: '1', targetNodeSfId: '3', label: 'Edge Label' }),
      workflowGraphEdgeFactory({
        sourceNodeSfId: '3',
        targetNodeSfId: '2',
        sourceHandle: 'sideways',
        targetHandle: 'sideways',
        /* markerStart: 'arrow',
        markerEnd: 'arrow', */
        label: 'Edge Label Label Label Label Label',
        /* animated: true, */
        onClick: onClickEdge,
      }),
      workflowGraphEdgeFactory({
        /* color: 'primary', */
        sourceNodeSfId: '4',
        targetNodeSfId: '4',
        sourceHandle: 'right',
        targetHandle: 'top',
        /* markerStart: 'arrow',
        markerEnd: 'arrow', */
        label: 'Edge Label',
        animated: true,
        onClick: onClickEdge,
      }),
      workflowGraphEdgeFactory({
        sourceNodeSfId: '3',
        targetNodeSfId: '4',
        label: 'Edge Label Edge Label Label Label Label Label',
      }),
      workflowGraphEdgeFactory({
        /* color: 'warning', */
        sourceNodeSfId: '5',
        targetNodeSfId: '5',
        /* markerEnd: 'arrow',
        markerStart: 'arrow', */
        sourceHandle: 'forward',
        targetHandle: 'forward',
        label: 'Label',
        onClick: onClickEdge,
      }),
    ],
  },
  'expert-graph',
  'data-guide-test',
);
const ExpertGraph = [expertGraphJSON];

/* const TestGraph = [
  workflowGraphFactory({
    defaultNodeSize: 'extraLarge',
    defaultNodeColor: 'primary',
    vertical: true,
    nodes: [
      workflowGraphNodeFactory({ componentChildren: [buttonFactory()] }, '1'),
      workflowGraphNodeFactory(
        {
          componentChildren: gridCat,
          size: 'extraLarge',
        },
        '2',
      ),
      workflowGraphNodeFactory({ componentChildren: gridCat, color: 'warning', size: 'large' }, '3'),
      workflowGraphNodeFactory(
        {
          componentChildren: gridText,
          color: 'danger',
          onClick: [
            {
              type: 'request',
              data: { action: 'tree-graph', pageEvent: 'onClickCard' },
            },
          ],
        },
        '4',
      ),
      workflowGraphNodeFactory({ componentChildren: [buttonFactory()] }, '5'),
    ],
    edges: [
      workflowGraphEdgeFactory({
        sourceNodeSfId: '1',
        targetNodeSfId: '2',
        markerEnd: 'none',
        markerStart: 'arrow',
        animated: true,
        onClick: onClickEdge,
      }),
      workflowGraphEdgeFactory({
        onClick: onClickEdge,
        sourceNodeSfId: '2',
        targetNodeSfId: '3',
        markerEnd: 'arrow',
        animated: true,
      }),
      workflowGraphEdgeFactory({ sourceNodeSfId: '2', targetNodeSfId: '4', animated: true, onClick: onClickEdge }),
      workflowGraphEdgeFactory({ sourceNodeSfId: '3', targetNodeSfId: '5', animated: true, onClick: onClickEdge }),
      workflowGraphEdgeFactory({ sourceNodeSfId: '4', targetNodeSfId: '5', animated: true, onClick: onClickEdge }),
    ],
  }),
];
 */
const edgeMarkerOptions = ['-default-', 'none', 'arrow'];

const defaultEdgeMarkerStartDropdown = dropdownMenuFactory({
  trigger: buttonFactory({ size: 'small', text: 'Default Edge Marker Start' }),
  componentParts: edgeMarkerOptions.map((marker) =>
    dropdownMenuEntryFactory({
      text: marker,
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: patchFactory([
              {
                targetSfId: 'expert-graph',
                operation: 'write',
                path: 'props.defaultEdgeMarkerStart',
                value: marker,
              },
            ]),
          },
        },
      ],
    }),
  ),
});

const defaultEdgeMarkerEndDropdown = dropdownMenuFactory({
  trigger: buttonFactory({ size: 'small', text: 'Default Edge Marker End' }),
  componentParts: edgeMarkerOptions.map((marker) =>
    dropdownMenuEntryFactory({
      text: marker,
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: patchFactory([
              {
                targetSfId: 'expert-graph',
                operation: 'write',
                path: 'props.defaultEdgeMarkerEnd',
                value: marker,
              },
            ]),
          },
        },
      ],
    }),
  ),
});

const defaultEdgeColorOptions = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'neutral'];

const defaultEdgeColorDropdown = dropdownMenuFactory({
  trigger: buttonFactory({ size: 'small', text: 'Default Edge Color' }),
  componentParts: defaultEdgeColorOptions.map((color) =>
    dropdownMenuEntryFactory({
      text: color,
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: patchFactory([
              {
                targetSfId: 'expert-graph',
                operation: 'write',
                path: 'props.defaultEdgeColor',
                value: color,
              },
            ]),
          },
        },
      ],
    }),
  ),
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType.js').SmartFaceBackendDataType }
 */
export const workflowGraphPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'WorkflowGraph' } },
        componentChildren: [
          uiHandlerFactory({
            componentChildren: [
              classicLayoutFactory({
                content: {
                  componentChildren: [
                    cardFactory({
                      fullHeight: true,
                      bodyChildren: ExpertGraph,

                      footerChildren: [
                        flexboxFactory({
                          items: [
                            flexboxItemFactory({
                              componentChildren: [defaultEdgeMarkerStartDropdown],
                            }),
                            flexboxItemFactory({
                              componentChildren: [defaultEdgeMarkerEndDropdown],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'Direction to TB',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.direction',
                                            value: 'TB',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'Direction to BT',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.direction',
                                            value: 'BT',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'Direction to LR',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.direction',
                                            value: 'LR',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'Direction to RL',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.direction',
                                            value: 'RL',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'Patch test',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: '1',
                                            operation: 'write',
                                            path: 'props.color',
                                            value: 'danger',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'defaultNodeSize (xs)',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.defaultNodeSize',
                                            value: 'extraSmall',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [
                                buttonFactory({
                                  size: 'small',
                                  text: 'defaultNodeSize (xl)',
                                  color: 'primary',
                                  corner: 'rounded',
                                  onClick: [
                                    {
                                      type: 'request',
                                      data: {
                                        action: 'reflect',
                                        reflectedData: patchFactory([
                                          {
                                            targetSfId: 'expert-graph',
                                            operation: 'write',
                                            path: 'props.defaultNodeSize',
                                            value: 'extraLarge',
                                          },
                                        ]),
                                      },
                                    },
                                  ],
                                }),
                              ],
                            }),
                            flexboxItemFactory({
                              componentChildren: [defaultEdgeColorDropdown],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
              }),
            ],
          }),
        ],
      },
      'page-01',
    ),
  ],
});
