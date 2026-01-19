// @ts-check

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { formFactory } from '../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { barChartFactory } from '../../../../shared/smartFaceComponentFactories/extension/barChartFactory.js';
import { headerAreaFactory } from '../../../../shared/smartFaceComponentFactories/extension/headerAreaFactory.js';
import { lineChartFactory } from '../../../../shared/smartFaceComponentFactories/extension/lineChartFactory.js';
import { pieChartFactory } from '../../../../shared/smartFaceComponentFactories/extension/pieChartFactory.js';
import { footer } from '../shared/footer.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const miscCharts = [
  // Bar Chart
  gridItemFactory({
    size: 12,
    componentChildren: [
      cardFactory({
        // title: 'Bar Chart',
        toolbarChildren: [
          gridFactory({
            rowGap: 'extraSmall',
            columnGap: 'extraSmall',
            items: [
              gridItemFactory({
                componentChildren: [
                  dropdownMenuFactory({
                    trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                    componentParts: [
                      dropdownMenuSectionFactory({
                        componentParts: [
                          dropdownMenuEntryFactory({
                            text: 'Export as png',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'export-as-png',
                                includeTitle: true,
                                includeSubtitle: true,
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as jpeg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'export-as-jpeg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as pdf',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'export-as-pdf',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as svg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'export-as-svg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Fullscreen',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'fullscreen',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Print',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['bar-chart-1'],
                                action: 'print',
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        bodyChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                // size: 10,
                componentChildren: [
                  barChartFactory(
                    {
                      tooltip: true,
                      dataLabel: true,
                      tooltipPostfix: '%',
                      noDataText: 'First Text that is not default',
                      dataHover: true,
                      // type: 'column',
                      type: 'columnStackedPercent',
                      legend: {
                        enabled: false,
                        interactive: true,
                        layout: 'horizontal',
                        align: 'left',
                        verticalAlign: 'bottom',
                      },
                      yAxis: {
                        title: 'Count',
                        majorTickPostfix: '%',
                        // gridline: false,
                        // majorTick: true,
                        // majorTickInterval: -200,
                        // minorTick: true,
                        // majorTickStart: 176,
                        // majorTickEnd: 8200,
                      },
                      xAxis: {
                        type: 'datetime',
                        pointStart: '2023-05-01',
                        // pointInterval: 0,
                        pointIntervalUnit: 'quarter',
                        title: 'Transportation',
                        // gridline: true,
                        // majorTick: true,
                        // minorTick: true,
                        // majorTickInterval: -10,
                        // reversed: false,
                        // categories: [
                        //   'plane',
                        //   'helicopter',
                        //   'boat',
                        //   'train',
                        //   'subway',
                        //   'bus',
                        //   'car',
                        //   'moto',
                        //   'bicycle',
                        //   'horse',
                        //   'skateboard',
                        //   'others',
                        // ],
                      },
                      data: [
                        // {
                        //   name: 'japan',
                        //   value: [
                        //     0.137, 0.79, 1.105, 0.4, 0.41, 0.2, 0.244, 0.274, 0.26, 0.122, 0.162,
                        //   ],
                        // },
                        // {
                        //   name: 'france',
                        //   value: [
                        //     0.236, 0.105, 0.95, 0.279, 0.94, 0.22, 0.55, 0.2, 0.249, 0.57, 0.23,
                        //   ],
                        // },
                        {
                          name: 'japan',
                          value: [-137, -79, 105, -40, 41, -200, 88, 244, 274, 26, 122, 162],
                        },
                        {
                          name: 'france',
                          value: [248, -236, 105, 95, -279, 94, 22, -55, 2, 249, -57, 230],
                        },
                        // {
                        //   name: 'japan',
                        //   value: [137, 150],
                        // },
                        // {
                        //   name: 'france',
                        //   value: [248, 140],
                        // },
                        // {
                        //   name: 'japan',
                        //   value: [137],
                        // },
                        // {
                        //   name: 'france',
                        //   value: [248],
                        // },
                        // {
                        //   name: 'us',
                        //   value: [52, 151, 219, 76, 248, 113, 105, 120, 284, 37, 285, 282],
                        // },
                        // {
                        //   name: 'germany',
                        //   value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                        // },
                        // {
                        //   name: 'norway',
                        //   value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                        // },
                        // {
                        //   name: 'japan',
                        //   value: [37, 79, 5, 40, 41, 20, 8, 24, 24, 26, 12, 16],
                        // },
                      ],
                    },
                    'bar-chart-1',
                    'data-guide-test',
                  ),
                ],
              }),
            ],
          }),
        ],
        footerChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Remove Data',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Add threshold 100',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.yAxis.threshold',
                              value: 100,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'change no data text',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.noDataText',
                              value: 'This is a different text',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'barStacked',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'barStacked',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'barStackedPercent',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'barStackedPercent',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'columnStacked',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'columnStacked',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'columnStackedPercent',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'columnStackedPercent',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Bars',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'bar',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Columns',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.type',
                              value: 'column',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Not reversed',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.xAxis.reversed',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Reversed',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.xAxis.reversed',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Legend enabled',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.legend.enabled',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Legend not enabled',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.legend.enabled',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Back to 5 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, null, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '2 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '15 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                                },
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, null, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'A lot of data',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, null, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                                {
                                  name: 'sweden',
                                  value: [120, 235, 210, 199, 181, 202, 215, 193, 220, 147, 198, 192],
                                },
                                {
                                  name: 'finland',
                                  value: [130, 255, 270, 180, 140, 160, 230, 140, 250, 20, 160, 150],
                                },
                                {
                                  name: 'denmark',
                                  value: [140, 225, 250, 185, 150, 170, 220, 150, 240, 10, 180, 170],
                                },
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                                },
                                {
                                  name: 'ireland',
                                  value: [180, 195, 225, 225, 200, 220, 190, 200, 235, 55, 240, 225],
                                },
                                {
                                  name: 'united kingdom',
                                  value: [190, 190, 230, 230, 205, 230, 185, 205, 245, 60, 250, 230],
                                },
                                {
                                  name: 'greece',
                                  value: [200, 185, 235, 235, 210, 240, 180, 210, 255, 65, 260, 235],
                                },
                                {
                                  name: 'turkey',
                                  value: [195, 180, 245, 240, 215, 255, 175, 215, 265, 70, 275, 240],
                                },
                                {
                                  name: 'poland',
                                  value: [210, 175, 255, 245, 220, 270, 170, 220, 275, 75, 290, 245],
                                },
                                {
                                  name: 'czech republic',
                                  value: [220, 170, 265, 250, 225, 285, 165, 225, 285, 80, 305, 250],
                                },
                                {
                                  name: 'slovakia',
                                  value: [225, 165, 275, 255, 230, 295, 160, 230, 295, 85, 320, 255],
                                },
                                {
                                  name: 'hungary',
                                  value: [235, 160, 285, 260, 240, 305, 155, 240, 305, 90, 335, 260],
                                },
                                {
                                  name: 'romania',
                                  value: [240, 155, 295, 265, 250, 315, 150, 250, 315, 95, 350, 265],
                                },
                                {
                                  name: 'bulgaria',
                                  value: [250, 150, 305, 270, 260, 325, 145, 260, 325, 100, 365, 270],
                                },
                                {
                                  name: 'russia',
                                  value: [260, 145, 315, 275, 270, 335, 140, 270, 335, 105, 380, 275],
                                },
                                {
                                  name: 'ukraine',
                                  value: [270, 140, 325, 280, 280, 345, 135, 280, 345, 110, 395, 280],
                                },
                                {
                                  name: 'belarus',
                                  value: [280, 135, 335, 285, 290, 355, 130, 290, 355, 115, 410, 285],
                                },
                                {
                                  name: 'latvia',
                                  value: [285, 130, 345, 290, 300, 365, 125, 300, 365, 120, 425, 290],
                                },
                                {
                                  name: 'estonia',
                                  value: [295, 125, 355, 295, 310, 375, 120, 310, 375, 125, 440, 295],
                                },
                                {
                                  name: 'lithuania',
                                  value: [300, 120, 365, 300, 320, 385, 115, 320, 385, 130, 455, 300],
                                },
                                {
                                  name: 'slovenia',
                                  value: [310, 115, 375, 305, 330, 395, 110, 330, 395, 135, 470, 305],
                                },
                                {
                                  name: 'croatia',
                                  value: [320, 110, 385, 310, 340, 405, 105, 340, 405, 140, 485, 310],
                                },
                                {
                                  name: 'bosnia and herzegovina',
                                  value: [330, 105, 395, 315, 350, 415, 100, 350, 415, 145, 500, 315],
                                },
                                {
                                  name: 'serbia',
                                  value: [340, 100, 405, 320, 360, 425, 95, 360, 425, 150, 515, 320],
                                },
                                {
                                  name: 'montenegro',
                                  value: [350, 95, 415, 325, 370, 435, 90, 370, 435, 155, 530, 325],
                                },
                                {
                                  name: 'albania',
                                  value: [360, 90, 425, 330, 380, 445, 85, 380, 445, 160, 545, 330],
                                },
                                {
                                  name: 'north macedonia',
                                  value: [370, 85, 435, 335, 390, 455, 80, 390, 455, 165, 560, 335],
                                },
                                {
                                  name: 'kosovo',
                                  value: [380, 80, 445, 340, 400, 465, 75, 400, 465, 170, 575, 340],
                                },
                                {
                                  name: 'bulgaria',
                                  value: [390, 75, 455, 345, 410, 475, 70, 410, 475, 175, 590, 345],
                                },
                                {
                                  name: 'greece',
                                  value: [400, 70, 465, 350, 420, 485, 65, 420, 485, 180, 605, 350],
                                },
                                {
                                  name: 'italy',
                                  value: [410, 65, 475, 355, 430, 495, 60, 430, 495, 185, 620, 355],
                                },
                                {
                                  name: 'spain',
                                  value: [420, 60, 485, 360, 440, 505, 55, 440, 505, 190, 635, 360],
                                },
                                {
                                  name: 'portugal',
                                  value: [430, 55, 495, 365, 450, 515, 50, 450, 515, 195, 650, 365],
                                },
                                {
                                  name: 'france',
                                  value: [440, 50, 505, 370, 460, 525, 45, 460, 525, 200, 665, 370],
                                },
                                {
                                  name: 'germany',
                                  value: [450, 45, 515, 375, 470, 535, 40, 470, 535, 205, 680, 375],
                                },
                                {
                                  name: 'netherlands',
                                  value: [460, 40, 525, 380, 480, 545, 35, 480, 545, 210, 695, 380],
                                },
                                {
                                  name: 'sweden',
                                  value: [470, 35, 535, 385, 490, 555, 30, 490, 555, 215, 710, 385],
                                },
                                {
                                  name: 'finland',
                                  value: [480, 30, 545, 390, 500, 565, 25, 500, 565, 220, 725, 390],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'A lot of datasets not so much values',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'bar-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272],
                                },
                                {
                                  name: 'sweden',
                                  value: [120, 235, 210],
                                },
                                {
                                  name: 'finland',
                                  value: [130, 255, 270],
                                },
                                {
                                  name: 'denmark',
                                  value: [140, 225, 250],
                                },
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235],
                                },
                                {
                                  name: 'ireland',
                                  value: [180, 195, 225],
                                },
                                {
                                  name: 'united kingdom',
                                  value: [190, 190, 230],
                                },
                                // {
                                //   name: 'greece',
                                //   value: [200, 185, 235],
                                // },
                                // {
                                //   name: 'turkey',
                                //   value: [195, 180, 245],
                                // },
                                // {
                                //   name: 'poland',
                                //   value: [210, 175, 255],
                                // },
                                // {
                                //   name: 'czech republic',
                                //   value: [220, 170, 265],
                                // },
                                // {
                                //   name: 'slovakia',
                                //   value: [225, 165, 275],
                                // },
                                // {
                                //   name: 'hungary',
                                //   value: [235, 160, 285],
                                // },
                                // {
                                //   name: 'romania',
                                //   value: [240, 155, 295],
                                // },
                                // {
                                //   name: 'bulgaria',
                                //   value: [250, 150, 305],
                                // },
                                // {
                                //   name: 'russia',
                                //   value: [260, 145, 315],
                                // },
                                // {
                                //   name: 'ukraine',
                                //   value: [270, 140, 325],
                                // },
                                // {
                                //   name: 'belarus',
                                //   value: [280, 135, 335],
                                // },
                                // {
                                //   name: 'latvia',
                                //   value: [285, 130, 345],
                                // },
                                // {
                                //   name: 'estonia',
                                //   value: [295, 125, 355],
                                // },
                                // {
                                //   name: 'lithuania',
                                //   value: [300, 120, 365],
                                // },
                                // {
                                //   name: 'slovenia',
                                //   value: [310, 115, 375],
                                // },
                                // {
                                //   name: 'croatia',
                                //   value: [320, 110, 385],
                                // },
                                // {
                                //   name: 'bosnia and herzegovina',
                                //   value: [330, 105, 395],
                                // },
                                // {
                                //   name: 'serbia',
                                //   value: [340, 100, 405],
                                // },
                                // {
                                //   name: 'montenegro',
                                //   value: [350, 95, 415],
                                // },
                                // {
                                //   name: 'albania',
                                //   value: [360, 90, 425],
                                // },
                                // {
                                //   name: 'north macedonia',
                                //   value: [370, 85, 435],
                                // },
                                // {
                                //   name: 'kosovo',
                                //   value: [380, 80, 445],
                                // },
                                // {
                                //   name: 'bulgaria',
                                //   value: [390, 75, 455],
                                // },
                                // {
                                //   name: 'greece',
                                //   value: [400, 70, 465],
                                // },
                                // {
                                //   name: 'italy',
                                //   value: [410, 65, 475],
                                // },
                                // {
                                //   name: 'spain',
                                //   value: [420, 60, 485],
                                // },
                                // {
                                //   name: 'portugal',
                                //   value: [430, 55, 495],
                                // },
                                // {
                                //   name: 'france',
                                //   value: [440, 50, 505],
                                // },
                                // {
                                //   name: 'germany',
                                //   value: [450, 45, 515],
                                // },
                                // {
                                //   name: 'netherlands',
                                //   value: [460, 40, 525],
                                // },
                                // {
                                //   name: 'sweden',
                                //   value: [470, 35, 535],
                                // },
                                // {
                                //   name: 'finland',
                                //   value: [480, 30, 545],
                                // },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }), //Line Chart
  gridItemFactory({
    size: 12,
    componentChildren: [
      cardFactory({
        title: 'Line/Area Chart',
        toolbarChildren: [
          gridFactory({
            rowGap: 'extraSmall',
            columnGap: 'extraSmall',
            items: [
              gridItemFactory({
                componentChildren: [
                  dropdownMenuFactory({
                    trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                    componentParts: [
                      dropdownMenuSectionFactory({
                        componentParts: [
                          dropdownMenuEntryFactory({
                            text: 'Export as png',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'export-as-png',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as jpeg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'export-as-jpeg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as pdf',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'export-as-pdf',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as svg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'export-as-svg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Fullscreen',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'fullscreen',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Print',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['line-chart-1'],
                                action: 'print',
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        bodyChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                componentChildren: [
                  headerAreaFactory({
                    title: 'Anzahl Personen in einer Organisationseinheit',
                    subtitle: 'Organisationseinheit Entwicklung und Produkt',
                    titleChildren: [
                      streamlineIconFactory({ name: 'star' }),
                      streamlineIconFactory({ name: 'star' }),
                      streamlineIconFactory({ name: 'star' }),
                    ],
                    subtitleChildren: [
                      streamlineIconFactory({ name: 'star' }),
                      streamlineIconFactory({ name: 'star' }),
                      streamlineIconFactory({ name: 'star' }),
                    ],
                    toolbarChildren: [
                      dropdownMenuFactory({
                        trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                        componentParts: [
                          dropdownMenuSectionFactory({
                            componentParts: [
                              dropdownMenuEntryFactory({
                                text: 'Export as png',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'export-as-png',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                    filename: 'TEST_PNG',
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Export as jpeg',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'export-as-jpeg',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                    filename: 'TEST_JPEG',
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Export as pdf',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'export-as-pdf',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Export as svg',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'export-as-svg',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Fullscreen',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'fullscreen',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Print',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'print',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                  },
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                    componentChildren: [
                      lineChartFactory(
                        {
                          tooltip: true,
                          tooltipPostfix: '%',
                          dataLabel: true,
                          dataHover: true,
                          // dataMarker: true,
                          exportTitle: 'dfgdggdgd',
                          exportSubtitle: 'lkjhgfdrtgzhuj',
                          legend: {
                            // enabled: true,
                            interactive: true,
                            align: 'right',
                            // verticalAlign: 'bottom',
                            layout: 'proximate',
                          },
                          yAxis: {
                            title: 'Count',
                            majorTick: true,
                            // decimals: true,
                            majorTickPostfix: '%',
                            // majorTickInterval: -20,
                            // minorTick: true,
                          },
                          xAxis: {
                            // type: 'datetime',
                            // pointStart: '2023-06-24',
                            // pointInterval: 1,
                            // pointIntervalUnit: 'quarter',
                            title: 'Transportation',
                            // gridline: true,
                            majorTick: true,
                            // minorTick: true,
                            // majorTickInterval: -30,
                            // categories: [
                            //   'plane',
                            //   'helicopter',
                            //   'boat',
                            //   'train',
                            //   'subway',
                            //   'bus',
                            //   'car',
                            //   'moto',
                            //   'bicycle',
                            //   'horse',
                            //   'skateboard',
                            //   'others',
                            // ],
                          },
                          data: [
                            // {
                            //   name: 'japan',
                            //   value: [137.1568, 79.7811, 105.694],
                            // },
                            // {
                            //   name: 'france',
                            //   value: [248, 236, 105],
                            // },
                            // {
                            //   name: 'us',
                            //   value: [0.1, 0.5, 1.219],
                            // },
                            // {
                            //   name: 'germany',
                            //   value: [1.97, 0.222, 0.208],
                            // },
                            // {
                            //   name: 'norway',
                            //   value: [135, 248, 272],
                            // },
                            {
                              name: 'iceland',
                              value: [-125, 240, -280, 175, 145, -150, 250, 145, -260, 15, 155, 160],
                            },
                            {
                              name: 'netherlands',
                              value: [145, 230, -265, 190, -155, 175, 235, 155, -55, 25, 175, 180],
                            },
                            // {
                            //   name: 'switzerland',
                            //   value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                            // },
                            // {
                            //   name: 'germany',
                            //   value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                            // },
                            // {
                            //   name: 'austria',
                            //   value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                            // },
                            // {
                            //   name: 'belgium',
                            //   value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                            // },
                            // {
                            //   name: 'france',
                            //   value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                            // },
                            // {
                            //   name: 'italy',
                            //   value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                            // },
                            // {
                            //   name: 'spain',
                            //   value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                            // },
                            // {
                            //   name: 'portugal',
                            //   value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                            // },
                            // {
                            //   name: 'japan',
                            //   value: [137, 79, 105, 40, 41, 200, 155, 244, 274, 26, 122, 162],
                            // },
                            // {
                            //   name: 'france',
                            //   value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                            // },
                            // {
                            //   name: 'us',
                            //   value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                            // },
                            // {
                            //   name: 'germany',
                            //   value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                            // },
                            // {
                            //   name: 'norway',
                            //   value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                            // },
                            // {
                            //   name: 'hungary',
                            //   value: [235, 160, 285, 260, 240, 305, 155, 240, 305, 90, 335, 260],
                            // },
                            // {
                            //   name: 'romania',
                            //   value: [240, 155, 295, 265, 250, 315, 150, 250, 315, 95, 350, 265],
                            // },
                            // {
                            //   name: 'bulgaria',
                            //   value: [250, 150, 305, 270, 260, 325, 145, 260, 325, 100, 365, 270],
                            // },
                            // {
                            //   name: 'russia',
                            //   value: [260, 145, 315, 275, 270, 335, 140, 270, 335, 105, 380, 275],
                            // },
                            // {
                            //   name: 'ukraine',
                            //   value: [270, 140, 325, 280, 280, 345, 135, 280, 345, 110, 395, 280],
                            // },
                            // {
                            //   name: 'us',
                            //   value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                            // },
                            // {
                            //   name: 'germany',
                            //   value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                            // },
                            // {
                            //   name: 'norway',
                            //   value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                            // },
                          ],
                        },
                        'line-chart-1',
                        'data-guide-test',
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        footerChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                componentChildren: [
                  gridFactory({
                    rowGap: 'extraSmall',
                    columnGap: 'extraSmall',
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to categories',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.categories',
                                      value: [
                                        'plane',
                                        'helicopter',
                                        'boat',
                                        'train',
                                        'subway',
                                        'bus',
                                        'car',
                                        'moto',
                                        'bicycle',
                                        'horse',
                                        'skateboard',
                                        'others',
                                      ],
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to datetime',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.type',
                                      value: 'datetime',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to day',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.pointIntervalUnit',
                                      value: 'day',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to year',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.pointIntervalUnit',
                                      value: 'year',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to quarter',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.pointIntervalUnit',
                                      value: 'quarter',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change to month',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.pointIntervalUnit',
                                      value: 'month',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Change pointStart',
                            size: 'extraSmall',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.xAxis.pointStart',
                                      value: '2023-02-25',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  gridFactory({
                    rowGap: 'extraSmall',
                    columnGap: 'extraSmall',
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Line Chart',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.type',
                                      value: 'line',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Area Chart',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.type',
                                      value: 'area',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Set step to center',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.step',
                                      value: true,
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Un-set step',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.step',
                                      value: false,
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Normal stacked area',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.type',
                                      value: 'areaStacked',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Percent stacked area',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.type',
                                      value: 'areaStackedPercent',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  gridFactory({
                    rowGap: 'extraSmall',
                    columnGap: 'extraSmall',
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend enabled',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.enabled',
                                      value: true,
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend not enabled',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.enabled',
                                      value: false,
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend align left',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.align',
                                      value: 'left',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend align right',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.align',
                                      value: 'right',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend align center',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.align',
                                      value: 'center',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend layout horizontal',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.layout',
                                      value: 'horizontal',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend layout vertical',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.layout',
                                      value: 'vertical',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend verticalAlign top',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.verticalAlign',
                                      value: 'top',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend verticalAlign middle',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.verticalAlign',
                                      value: 'middle',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          buttonFactory({
                            text: 'Legend verticalAlign bottom',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'line-chart-1',
                                      operation: 'write',
                                      path: 'props.legend.verticalAlign',
                                      value: 'bottom',
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Add threshold 100',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.yAxis.threshold',
                              value: 100,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Change Title',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'headerProps.title',
                              value: 'New Title',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Change Title Again',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'headerProps.title',
                              value: 'This is a brand new title',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Shared Tooltip',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.tooltip',
                              value: 'shared',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Not shared Tooltip',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.tooltip',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Crosshair X on',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.xAxis.crosshair',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Crosshair Y on',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.yAxis.crosshair',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Crosshair Y off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.yAxis.crosshair',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Crosshair X off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.xAxis.crosshair',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'dataLabel intelligent',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: 'intelligent',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'dataLabel on',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'dataLabel off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'tooltip on',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.tooltip',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'tooltip off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.tooltip',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'dataMarker on',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.dataMarker',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'dataMarker off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.dataMarker',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Only 9 data points',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 20],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Back to 5 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [145.237, 32.491, 178.862, 94.375, 120.549],
                                },
                                {
                                  name: 'france',
                                  value: [7.874, 183.229, 59.183, 110.706, 90.525],
                                },
                                {
                                  name: 'us',
                                  value: [162.384, 28.73, 67.987, 4.946, 123.65],
                                },
                                {
                                  name: 'germany',
                                  value: [199.572, 61.489, 134.805, 42.091, 177.359],
                                },
                                {
                                  name: 'norway',
                                  value: [89.245, 76.118, 151.649, 173.318, 112.974],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '15 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                                },
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, 155, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '20 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                                },
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, 155, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                                {
                                  name: 'hungary',
                                  value: [235, 160, 285, 260, 240, 305, 155, 240, 305, 90, 335, 260],
                                },
                                {
                                  name: 'romania',
                                  value: [240, 155, 295, 265, 250, 315, 150, 250, 315, 95, 350, 265],
                                },
                                {
                                  name: 'bulgaria',
                                  value: [250, 150, 305, 270, 260, 325, 145, 260, 325, 100, 365, 270],
                                },
                                {
                                  name: 'russia',
                                  value: [260, 145, 315, 275, 270, 335, 140, 270, 335, 105, 380, 275],
                                },
                                {
                                  name: 'ukraine',
                                  value: [270, 140, 325, 280, 280, 345, 135, 280, 345, 110, 395, 280],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'A lot of data',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'line-chart-1',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'japan',
                                  value: [137, 79, 105, 40, 41, 200, null, 244, 274, 26, 122, 162],
                                },
                                {
                                  name: 'france',
                                  value: [248, 236, 105, 95, 297, 94, 22, 55, 2, 249, 57, 230],
                                },
                                {
                                  name: 'us',
                                  value: [52, 151, 219, 76, 248, 113, 105, 120, 294, 37, 285, 292],
                                },
                                {
                                  name: 'germany',
                                  value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
                                },
                                {
                                  name: 'norway',
                                  value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
                                },
                                {
                                  name: 'sweden',
                                  value: [120, 235, 210, 199, 181, 202, 215, 193, 220, 147, 198, 192],
                                },
                                {
                                  name: 'finland',
                                  value: [130, 255, 270, 180, 140, 160, 230, 140, 250, 20, 160, 150],
                                },
                                {
                                  name: 'denmark',
                                  value: [140, 225, 250, 185, 150, 170, 220, 150, 240, 10, 180, 170],
                                },
                                {
                                  name: 'iceland',
                                  value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
                                },
                                {
                                  name: 'netherlands',
                                  value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
                                },
                                {
                                  name: 'switzerland',
                                  value: [115, 245, 275, 185, 135, 170, 240, 135, 270, 8, 160, 170],
                                },
                                {
                                  name: 'germany',
                                  value: [150, 220, 260, 195, 160, 180, 250, 160, 280, 30, 190, 200],
                                },
                                {
                                  name: 'austria',
                                  value: [135, 225, 245, 190, 165, 175, 230, 165, 250, 18, 170, 175],
                                },
                                {
                                  name: 'belgium',
                                  value: [140, 235, 255, 200, 170, 190, 245, 170, 265, 28, 180, 185],
                                },
                                {
                                  name: 'france',
                                  value: [160, 215, 240, 205, 175, 195, 225, 175, 245, 35, 195, 205],
                                },
                                {
                                  name: 'italy',
                                  value: [155, 210, 225, 210, 180, 210, 215, 180, 235, 40, 210, 210],
                                },
                                {
                                  name: 'spain',
                                  value: [165, 205, 230, 215, 185, 215, 205, 185, 225, 45, 215, 215],
                                },
                                {
                                  name: 'portugal',
                                  value: [175, 200, 235, 220, 195, 225, 195, 195, 240, 50, 230, 220],
                                },
                                {
                                  name: 'ireland',
                                  value: [180, 195, 225, 225, 200, 220, 190, 200, 235, 55, 240, 225],
                                },
                                {
                                  name: 'united kingdom',
                                  value: [190, 190, 230, 230, 205, 230, 185, 205, 245, 60, 250, 230],
                                },
                                {
                                  name: 'greece',
                                  value: [200, 185, 235, 235, 210, 240, 180, 210, 255, 65, 260, 235],
                                },
                                {
                                  name: 'turkey',
                                  value: [195, 180, 245, 240, 215, 255, 175, 215, 265, 70, 275, 240],
                                },
                                {
                                  name: 'poland',
                                  value: [210, 175, 255, 245, 220, 270, 170, 220, 275, 75, 290, 245],
                                },
                                {
                                  name: 'czech republic',
                                  value: [220, 170, 265, 250, 225, 285, 165, 225, 285, 80, 305, 250],
                                },
                                {
                                  name: 'slovakia',
                                  value: [225, 165, 275, 255, 230, 295, 160, 230, 295, 85, 320, 255],
                                },
                                {
                                  name: 'hungary',
                                  value: [235, 160, 285, 260, 240, 305, 155, 240, 305, 90, 335, 260],
                                },
                                {
                                  name: 'romania',
                                  value: [240, 155, 295, 265, 250, 315, 150, 250, 315, 95, 350, 265],
                                },
                                {
                                  name: 'bulgaria',
                                  value: [250, 150, 305, 270, 260, 325, 145, 260, 325, 100, 365, 270],
                                },
                                {
                                  name: 'russia',
                                  value: [260, 145, 315, 275, 270, 335, 140, 270, 335, 105, 380, 275],
                                },
                                {
                                  name: 'ukraine',
                                  value: [270, 140, 325, 280, 280, 345, 135, 280, 345, 110, 395, 280],
                                },
                                {
                                  name: 'belarus',
                                  value: [280, 135, 335, 285, 290, 355, 130, 290, 355, 115, 410, 285],
                                },
                                {
                                  name: 'latvia',
                                  value: [285, 130, 345, 290, 300, 365, 125, 300, 365, 120, 425, 290],
                                },
                                {
                                  name: 'estonia',
                                  value: [295, 125, 355, 295, 310, 375, 120, 310, 375, 125, 440, 295],
                                },
                                {
                                  name: 'lithuania',
                                  value: [300, 120, 365, 300, 320, 385, 115, 320, 385, 130, 455, 300],
                                },
                                {
                                  name: 'slovenia',
                                  value: [310, 115, 375, 305, 330, 395, 110, 330, 395, 135, 470, 305],
                                },
                                {
                                  name: 'croatia',
                                  value: [320, 110, 385, 310, 340, 405, 105, 340, 405, 140, 485, 310],
                                },
                                {
                                  name: 'bosnia and herzegovina',
                                  value: [330, 105, 395, 315, 350, 415, 100, 350, 415, 145, 500, 315],
                                },
                                {
                                  name: 'serbia',
                                  value: [340, 100, 405, 320, 360, 425, 95, 360, 425, 150, 515, 320],
                                },
                                {
                                  name: 'montenegro',
                                  value: [350, 95, 415, 325, 370, 435, 90, 370, 435, 155, 530, 325],
                                },
                                {
                                  name: 'albania',
                                  value: [360, 90, 425, 330, 380, 445, 85, 380, 445, 160, 545, 330],
                                },
                                {
                                  name: 'north macedonia',
                                  value: [370, 85, 435, 335, 390, 455, 80, 390, 455, 165, 560, 335],
                                },
                                {
                                  name: 'kosovo',
                                  value: [380, 80, 445, 340, 400, 465, 75, 400, 465, 170, 575, 340],
                                },
                                {
                                  name: 'bulgaria',
                                  value: [390, 75, 455, 345, 410, 475, 70, 410, 475, 175, 590, 345],
                                },
                                {
                                  name: 'greece',
                                  value: [400, 70, 465, 350, 420, 485, 65, 420, 485, 180, 605, 350],
                                },
                                {
                                  name: 'italy',
                                  value: [410, 65, 475, 355, 430, 495, 60, 430, 495, 185, 620, 355],
                                },
                                {
                                  name: 'spain',
                                  value: [420, 60, 485, 360, 440, 505, 55, 440, 505, 190, 635, 360],
                                },
                                {
                                  name: 'portugal',
                                  value: [430, 55, 495, 365, 450, 515, 50, 450, 515, 195, 650, 365],
                                },
                                {
                                  name: 'france',
                                  value: [440, 50, 505, 370, 460, 525, 45, 460, 525, 200, 665, 370],
                                },
                                {
                                  name: 'germany',
                                  value: [450, 45, 515, 375, 470, 535, 40, 470, 535, 205, 680, 375],
                                },
                                {
                                  name: 'netherlands',
                                  value: [460, 40, 525, 380, 480, 545, 35, 480, 545, 210, 695, 380],
                                },
                                {
                                  name: 'sweden',
                                  value: [470, 35, 535, 385, 490, 555, 30, 490, 555, 215, 710, 385],
                                },
                                {
                                  name: 'finland',
                                  value: [480, 30, 545, 390, 500, 565, 25, 500, 565, 220, 725, 390],
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  // Export Pie Chart
  gridItemFactory({
    size: 12,
    componentChildren: [
      cardFactory({
        toolbarChildren: [
          gridFactory({
            rowGap: 'extraSmall',
            columnGap: 'extraSmall',
            items: [
              gridItemFactory({
                componentChildren: [
                  dropdownMenuFactory({
                    trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                    componentParts: [
                      dropdownMenuSectionFactory({
                        componentParts: [
                          dropdownMenuEntryFactory({
                            text: 'Export as png',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'export-as-png',
                                includeTitle: true,
                                includeSubtitle: true,
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as jpeg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'export-as-jpeg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as pdf',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'export-as-pdf',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Export as svg',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'export-as-svg',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Fullscreen',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'fullscreen',
                              },
                            ],
                          }),
                          dropdownMenuEntryFactory({
                            text: 'Print',
                            onClick: [
                              {
                                type: 'chart-action',
                                targetSfId: ['pie-chart-1'],
                                action: 'print',
                              },
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        bodyChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                size: 12,
                componentChildren: [
                  headerAreaFactory({
                    title: 'Anzahl Personen in einer Organisationseinheit',
                    subtitle: 'Organisationseinheit Entwicklung und Produkt',
                    toolbarChildren: [
                      dropdownMenuFactory({
                        trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                        componentParts: [
                          dropdownMenuSectionFactory({
                            componentParts: [
                              dropdownMenuEntryFactory({
                                text: 'Export as png',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'export-as-png',
                                    includeTitle: true,
                                    includeSubtitle: true,
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Fullscreen',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'fullscreen',
                                    includeTitle: false,
                                    includeSubtitle: false,
                                  },
                                ],
                              }),
                              dropdownMenuEntryFactory({
                                text: 'Print',
                                onClick: [
                                  {
                                    type: 'chart-action',
                                    targetSfId: ['line-chart-1'],
                                    action: 'print',
                                    // includeTitle: true,
                                    // includeSubtitle: true,
                                  },
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                    componentChildren: [
                      pieChartFactory(
                        {
                          exportTitle: 'blablabla',
                          exportSubtitle: 'blablabla',
                          tooltip: true,
                          dataLabel: true,
                          dataLabelFormat: 'decimal',
                          dataHover: false,
                          colorSet: 'secondary',
                          data: [
                            {
                              name: 'php',
                              value: 400.33,
                            },
                            {
                              name: 'scala',
                              value: 300.9934,
                            },
                            {
                              name: 'stylus',
                              value: 558.85,
                            },
                            {
                              name: 'haskell',
                              value: 573.6354,
                            },
                            {
                              name: 'elixir',
                              value: 174,
                            },
                          ],
                          dataSelection: false,
                          legend: {
                            interactive: true,
                          },
                        },
                        'pie-chart-1',
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
        footerChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Export png',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'export-as-png',
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Export jpeg',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'export-as-jpeg',
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Export pdf',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'export-as-pdf',
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Export svg',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'export-as-svg',
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Fullscreen',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'fullscreen',
                      },
                    ],
                  }),
                ],
              }),

              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Print',
                    onClick: [
                      {
                        type: 'chart-action',
                        targetSfId: ['pie-chart-1'],
                        action: 'print',
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  // Pie Chart
  gridItemFactory({
    size: 12,
    componentChildren: [
      cardFactory({
        title: 'Pie Chart',

        bodyChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                size: 10,
                componentChildren: [
                  pieChartFactory(
                    {
                      title: 'Anzahl Personen in einer Organisationseinheit',
                      subtitle: 'Organisationseinheit Entwicklung und Produkt',
                      titleChildren: [
                        streamlineIconFactory({ name: 'star' }),
                        streamlineIconFactory({ name: 'star' }),
                        streamlineIconFactory({ name: 'star' }),
                        streamlineIconFactory({ name: 'star' }),
                      ],
                      subtitleChildren: [streamlineIconFactory({ name: 'star' })],
                      toolbarChildren: [
                        gridFactory({
                          rowGap: 'extraSmall',
                          columnGap: 'extraSmall',
                          items: [
                            gridItemFactory({
                              componentChildren: [
                                dropdownMenuFactory({
                                  trigger: buttonFactory({ text: 'Dropdown', color: 'danger' }),
                                  componentParts: [
                                    dropdownMenuSectionFactory({
                                      componentParts: [
                                        dropdownMenuEntryFactory({
                                          text: 'Export as png',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              action: 'export-as-png',
                                              // filename: 'pie-chart',
                                              includeTitle: true,
                                              includeSubtitle: true,
                                            },
                                          ],
                                        }),
                                        dropdownMenuEntryFactory({
                                          text: 'Export as jpeg',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              filename: 'pie-chart',
                                              action: 'export-as-jpeg',
                                            },
                                          ],
                                        }),
                                        dropdownMenuEntryFactory({
                                          text: 'Export as pdf',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              action: 'export-as-pdf',
                                              filename: 'pie-chart',
                                            },
                                          ],
                                        }),
                                        dropdownMenuEntryFactory({
                                          text: 'Export as svg',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              action: 'export-as-svg',
                                              filename: 'pie-chart',
                                            },
                                          ],
                                        }),
                                        dropdownMenuEntryFactory({
                                          text: 'Fullscreen',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              action: 'fullscreen',
                                            },
                                          ],
                                        }),
                                        dropdownMenuEntryFactory({
                                          text: 'Print',
                                          onClick: [
                                            {
                                              type: 'chart-action',
                                              targetSfId: ['pie-chart-2'],
                                              action: 'print',
                                            },
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                      data: [
                        {
                          name: 'php',
                          value: 400,
                        },
                        {
                          name: 'scala',
                          value: 300,
                        },
                        {
                          name: 'stylus',
                          value: 558,
                        },
                        {
                          name: 'haskell',
                          value: 573,
                        },
                        {
                          name: 'elixir',
                          value: 174,
                        },
                      ],
                      dataSelection: true,
                      dataLabel: 'intelligent',
                      legend: {
                        enabled: true,
                      },
                      tooltip: true,
                      dataLabelFormat: 'decimal',
                      // tooltipFormat: 'decimalAndPercentage',
                      noDataText:
                        'fksdhfkjshfkhfs fksdhfkjshfkhfsfksdhfkjshfkhfs fksdhfkjshfkhfs fksdhfkjshfkhfs fksdhfkjshfkhfs ',
                    },
                    'pie-chart-2',
                  ),
                ],
              }),
            ],
          }),
        ],
        footerChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Remove Pieces',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.data',
                              value: [],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '15 pieces',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '20 pieces',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Legend enabled',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.legend.enabled',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Legend not enabled',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.legend.enabled',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Change Title',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'headerProps.title',
                              value: 'New Title',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Change Subtitle',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'headerProps.subtitle',
                              value: 'New Subtitle',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Change Title Again',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'headerProps.title',
                              value: 'New Title 3',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Donut On',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.type',
                              value: 'donut',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'Donut Off',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.type',
                              value: 'pie',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabel true',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: true,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabel false',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: false,
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabel intelligent',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabel',
                              value: 'intelligent',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // DataLabelFormat decimal
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabelFormat decimal',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabelFormat',
                              value: 'decimal',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // DataLabelFormat percentage
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabelFormat percentage',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabelFormat',
                              value: 'percentage',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // DataLabelFormat decimalAndPercentage
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'DataLabelFormat decimalAndPercentage',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.dataLabelFormat',
                              value: 'decimalAndPercentage',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // TooltipFormat decimal
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'TooltipFormat decimal',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.tooltipFormat',
                              value: 'decimal',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // TooltipFormat percentage
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'TooltipFormat percentage',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.tooltipFormat',
                              value: 'percentage',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              // TooltipFormat decimalAndPercentage
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: 'TooltipFormat decimalAndPercentage',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.tooltipFormat',
                              value: 'decimalAndPercentage',
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '5 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
              gridItemFactory({
                componentChildren: [
                  buttonFactory({
                    text: '11 datasets',
                    onClick: [
                      {
                        type: 'request',
                        data: {
                          action: 'reflect',
                          reflectedData: patchFactory([
                            {
                              targetSfId: 'pie-chart-2',
                              operation: 'write',
                              path: 'props.data',
                              value: [
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                                {
                                  name: 'scala',
                                  value: 300,
                                },
                                {
                                  name: 'stylus',
                                  value: 558,
                                },
                                {
                                  name: 'haskell',
                                  value: 573,
                                },
                                {
                                  name: 'elixir',
                                  value: 174,
                                },
                                {
                                  name: 'php',
                                  value: 400,
                                },
                              ],
                            },
                          ]),
                        },
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),

  // HeaderArea
  gridItemFactory({
    size: 12,
    componentChildren: [
      cardFactory({
        bodyChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                size: 12,
                componentChildren: [
                  headerAreaFactory({
                    title: 'Anzahl Personen in einer Organisationseinheit',
                    subtitle: 'Organisationseinheit Entwicklung und Produkt',
                    titleChildren: [streamlineIconFactory({ name: 'star' }), streamlineIconFactory({ name: 'star' })],
                    subtitleChildren: [
                      streamlineIconFactory({ name: 'star' }),
                      streamlineIconFactory({ name: 'star' }),
                    ],
                    toolbarChildren: [
                      gridFactory({
                        // rowGap: 'extraSmall',
                        // columnGap: 'extraSmall',
                        items: [
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  // Pie charts start here
  gridItemFactory({
    size: 12,
    componentChildren: [
      formFactory({
        componentChildren: [
          gridFactory({
            items: [
              gridItemFactory({
                size: 12,
                componentChildren: [
                  headerAreaFactory({
                    title: 'this is a title',
                    subtitle: 'this is a subtitle',
                    titleChildren: [fontAwesomeIconFactory()],
                    subtitleChildren: [fontAwesomeIconFactory()],
                    toolbarChildren: [
                      gridFactory({
                        // rowGap: 'extraSmall',
                        // columnGap: 'extraSmall',
                        items: [
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              iconButtonFactory({
                                color: 'secondary',
                                icon: fontAwesomeIconFactory(),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                    componentChildren: [
                      pieChartFactory(
                        {
                          // seriesName: '',
                          tooltip: true,
                          dataHover: true,
                          colorSet: 'bright',
                          data: [
                            {
                              name: 'php',
                              value: 400,
                            },
                            {
                              name: 'scala',
                              value: 300,
                            },
                            {
                              name: 'stylus',
                              value: 558,
                            },
                            {
                              name: 'haskell',
                              value: 573,
                            },
                            {
                              name: 'elixir',
                              value: 174,
                            },
                          ],
                          dataSelection: true,
                          legend: {
                            interactive: false,
                          },
                          dataLabelFormat: 'percentage',
                        },
                        'pie-chart-0',
                        'data-guide-test',
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

const pieChartExportWithHeader = headerAreaFactory({
  title: 'headerArea - title',
  subtitle: 'headerArea - subtitle',
  componentChildren: [
    pieChartFactory(
      {
        exportTitle: 'pieChart - exportTitle',
        exportSubtitle: 'pieChart - exportSubtitle',
        tooltip: true,
        dataHover: true,
        colorSet: 'bright',
        data: [
          {
            name: 'Development',
            value: 400,
          },
          {
            name: 'Marketing',
            value: 300,
          },
          {
            name: 'Sales',
            value: 558,
          },
          {
            name: 'Support',
            value: 573,
          },
          {
            name: 'HR',
            value: 174,
          },
        ],
        dataSelection: true,
        legend: {
          interactive: false,
        },
        dataLabelFormat: 'percentage',
      },
      'nc-pie-chart-001',
      'data-guide-test',
    ),
  ],
});

const lineChartExportWithHeader = headerAreaFactory({
  title: 'headerArea - title',
  subtitle: 'headerArea - subtitle',
  componentChildren: [
    lineChartFactory(
      {
        exportTitle: 'lineChart - exportTitle',
        exportSubtitle: 'lineChart - exportSubtitle',
        tooltip: true,
        tooltipPostfix: '%',
        dataLabel: true,
        dataHover: true,
        legend: {
          interactive: true,
          align: 'right',
          layout: 'proximate',
        },
        yAxis: {
          title: 'Performance',
          majorTick: true,
          majorTickPostfix: '%',
        },
        xAxis: {
          title: 'Time Period',
          majorTick: true,
        },
        data: [
          {
            name: 'Q1 Performance',
            value: [125, 240, 280, 175, 145, 150, 250, 145, 260, 15, 155, 160],
          },
          {
            name: 'Q2 Performance',
            value: [145, 230, 265, 190, 155, 175, 235, 155, 255, 25, 175, 180],
          },
        ],
      },
      'nc-line-chart-001',
      'data-guide-test',
    ),
  ],
});

const barChartExportWithHeader = headerAreaFactory({
  title: 'headerArea - title',
  subtitle: 'headerArea - subtitle',
  componentChildren: [
    barChartFactory(
      {
        exportTitle: 'barChart - exportTitle',
        exportSubtitle: 'barChart - exportSubtitle',
        tooltip: true,
        dataLabel: true,
        tooltipPostfix: '%',
        dataHover: true,
        type: 'column',
        legend: {
          enabled: false,
          interactive: true,
          layout: 'horizontal',
          align: 'left',
          verticalAlign: 'bottom',
        },
        yAxis: {
          title: 'Values',
          majorTickPostfix: '%',
        },
        xAxis: {
          title: 'Categories',
          majorTick: true,
        },
        data: [
          {
            name: 'Dataset A',
            value: [137, 79, 105, 40, 41, 200, 88, 244, 274, 26, 122, 162],
          },
          {
            name: 'Dataset B',
            value: [248, 236, 105, 95, 279, 94, 22, 55, 2, 249, 57, 230],
          },
        ],
      },
      'nc-bar-chart-001',
      'data-guide-test',
    ),
  ],
});

const exportTest = [
  gridItemFactory({
    size: 12,
    componentChildren: [
      accordionFactory({
        items: [
          accordionItemFactory(
            {
              title: 'Export: Pie Chart',
              componentChildren: [
                cardFactory({
                  toolbarChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (Include exportTitle/exportSubtitle)',
                                color: 'primary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (No exportTitle/exportSubtitle)',
                                color: 'secondary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-pie-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                  bodyChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          size: 12,
                          componentChildren: [pieChartExportWithHeader],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            'nc-pie-accordion-item-001',
          ),
          accordionItemFactory(
            {
              title: 'Export: Line Chart',
              componentChildren: [
                cardFactory({
                  toolbarChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (Include exportTitle/exportSubtitle)',
                                color: 'primary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (No exportTitle/exportSubtitle)',
                                color: 'secondary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-line-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                  bodyChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          size: 12,
                          componentChildren: [lineChartExportWithHeader],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            'nc-line-accordion-item-001',
          ),
          accordionItemFactory(
            {
              title: 'Export: Bar Chart',
              componentChildren: [
                cardFactory({
                  toolbarChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (Include exportTitle/exportSubtitle)',
                                color: 'primary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: true,
                                          includeSubtitle: true,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          componentChildren: [
                            dropdownMenuFactory({
                              trigger: buttonFactory({
                                text: 'Export (No exportTitle/exportSubtitle)',
                                color: 'secondary',
                              }),
                              componentParts: [
                                dropdownMenuSectionFactory({
                                  componentParts: [
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PNG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-png',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as JPEG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-jpeg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as PDF',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-pdf',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                    dropdownMenuEntryFactory({
                                      text: 'Export as SVG',
                                      onClick: [
                                        {
                                          type: 'chart-action',
                                          targetSfId: ['nc-bar-chart-001'],
                                          action: 'export-as-svg',
                                          includeTitle: false,
                                          includeSubtitle: false,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                  bodyChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          size: 12,
                          componentChildren: [barChartExportWithHeader],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            'nc-bar-accordion-item-001',
          ),
        ],
      }),
    ],
  }),
];

/** @type {import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType}  */
export const chartsPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        document: { head: { title: 'Charts Page' } },
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('charts-page', ['component-pages']),
            content: {
              componentChildren: [
                gridFactory({
                  // items: [...exportTest],
                  items: [...exportTest, ...miscCharts],
                }),
              ],
            },
            header: {
              componentChildren: [],
            },
            footer,
          }),
        ],
        modals: [],
      },
      'page-0',
    ),
  ],
});
