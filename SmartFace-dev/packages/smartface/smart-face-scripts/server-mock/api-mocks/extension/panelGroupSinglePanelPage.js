// @ts-check

import getId from '#shared/getId';
import {
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '#shared/smartFaceComponentFactories/core/dropdownMenuFactory';
import { iconButtonFactory } from '#shared/smartFaceComponentFactories/core/iconButtonFactory';
import { streamlineIconFactory } from '#shared/smartFaceComponentFactories/core/streamlineIconFactory';
import { headerAreaFactory } from '#shared/smartFaceComponentFactories/extension/headerAreaFactory';
import { lineChartFactory } from '#shared/smartFaceComponentFactories/extension/lineChartFactory';

import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import {
  panelGroupFactory,
  panelGroupItemFactory,
} from '../../../../shared/smartFaceComponentFactories/extension/panelGroupFactory.js';
import { patchFactory } from '../shared/patchFactory.js';
import { sidebar } from '../shared/sidebar.js';

const panelGroupItem = panelGroupItemFactory(
  {
    size: 50, // Size has to be set to provoke error
    componentChildren: [
      headerAreaFactory({
        title: 'Anzahl Personen in einer Organisationseinheit',
        subtitle: 'Organisationseinheit Entwicklung und Produkt',
        toolbarChildren: [
          dropdownMenuFactory({
            trigger: iconButtonFactory({
              icon: streamlineIconFactory({ name: 'star' }),
              variant: 'subtle',
            }),
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
        componentChildren: [
          lineChartFactory(
            {
              dataHover: true,
              legend: {
                interactive: true,
              },
              yAxis: {
                title: 'Count',
              },
              xAxis: {
                type: 'datetime',
                pointStart: '2021-03-24',
                pointInterval: 1,
                pointIntervalUnit: 'quarter',
                title: 'Transportation',
                majorTick: true,
              },
              data: [
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
            'line-chart-1',
          ),
        ],
      }),
    ],
  },
  getId(),
);

const secondPanelGroupItem = panelGroupItemFactory({
  size: 50,
  componentChildren: [buttonFactory()],
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const panelGroupSinglePanelPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      document: { head: { title: 'PanelGroup Page' } },
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('panel-group-page', ['component-pages']),
          content: {
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      cardFactory({
                        title: 'Nested PanelGroup',
                        toolbarChildren: [
                          buttonFactory({
                            text: 'Add another panel',
                            onClick: [
                              {
                                type: 'request',
                                data: {
                                  action: 'reflect',
                                  reflectedData: patchFactory([
                                    {
                                      targetSfId: 'single-panel-group',
                                      operation: 'append',
                                      path: 'props.items',
                                      value: secondPanelGroupItem,
                                    },
                                  ]),
                                },
                              },
                            ],
                          }),
                        ],
                        bodyChildren: [
                          panelGroupFactory(
                            {
                              direction: 'horizontal',
                              defaultThreshold: 'extraSmall',
                              items: [panelGroupItem],
                            },
                            'single-panel-group',
                          ),
                        ],
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
});
