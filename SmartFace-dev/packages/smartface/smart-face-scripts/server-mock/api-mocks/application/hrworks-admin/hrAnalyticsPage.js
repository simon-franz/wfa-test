// @ts-check
import { dataWidgetFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-admin/dataWidgetFactory.js';
import { hrworksAdminLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-admin/hrworksAdminLayoutFactory.js';
import { hrworksAdminLayoutProfileImageFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-admin/hrworksAdminLayoutProfileImageFactory.js';
import { badgeFactory } from '../../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { dateFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
import { dateRangeFieldFactory } from '../../../../../shared/smartFaceComponentFactories/core/dateRangeFieldFactory.js';
import {
  dropdownMenuDividerFactory,
  dropdownMenuEntryFactory,
  dropdownMenuFactory,
  dropdownMenuSectionFactory,
} from '../../../../../shared/smartFaceComponentFactories/core/dropdownMenuFactory.js';
import {
  flexboxFactory,
  flexboxItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/core/flexboxFactory.js';
import { fontAwesomeIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { formFactory } from '../../../../../shared/smartFaceComponentFactories/core/formFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { iconButtonFactory } from '../../../../../shared/smartFaceComponentFactories/core/iconButtonFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { selectFactory } from '../../../../../shared/smartFaceComponentFactories/core/selectFactory.js';
import { sizeHandlerFactory } from '../../../../../shared/smartFaceComponentFactories/core/sizeHandlerFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFactory } from '../../../../../shared/smartFaceComponentFactories/core/textFactory.js';
import { uiHandlerFactory } from '../../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { barChartFactory } from '../../../../../shared/smartFaceComponentFactories/extension/barChartFactory.js';
import { headerAreaFactory } from '../../../../../shared/smartFaceComponentFactories/extension/headerAreaFactory.js';
import { lineChartFactory } from '../../../../../shared/smartFaceComponentFactories/extension/lineChartFactory.js';
import {
  panelGroupFactory,
  panelGroupItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/extension/panelGroupFactory.js';
import { pieChartFactory } from '../../../../../shared/smartFaceComponentFactories/extension/pieChartFactory.js';

const headerProps = {
  logo: {
    src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png',
    alt: 'logo',
    href: '#',
  },
  navigationItems: [
    {
      text: 'Dashboard',
      onClick: [
        {
          type: 'request',
          data: {
            action: 'reflect',
            reflectedData: {
              sideEffects: [
                { type: 'consoleMessage', message: 'Navigating to Dashboard' },
                { type: 'redirect', url: 'dashboard' },
              ],
            },
          },
        },
      ],
      sfId: 'id-analytics0',
    },
    { text: 'HR-Analytics', sfId: 'id-analytics1', href: '/hrAnalytics' },
    { text: 'Organigramm', sfId: 'id-analytics3', href: '/hrAnalytics' },
  ],
  componentChildren: [
    gridFactory(
      {
        items: [
          gridItemFactory({
            componentChildren: [fontAwesomeIconFactory({ name: 'pen' })],
          }),
          gridItemFactory({
            componentChildren: [fontAwesomeIconFactory({ name: 'info' })],
          }),
          gridItemFactory({
            componentChildren: [
              dropdownMenuFactory({
                componentParts: [
                  dropdownMenuEntryFactory({ text: 'Zurück zur Admin-Oberfläche', href: '/' }),
                  dropdownMenuEntryFactory({ text: 'Abmelden', href: '/' }),
                ],
                placement: 'bottom-end',
                trigger: hrworksAdminLayoutProfileImageFactory({}, undefined, 'data-guide-test'),
              }),
            ],
          }),
        ],
      },
      'grid-0',
    ),
  ],
};
const leftContentHeader = formFactory(
  {
    componentChildren: [
      gridFactory({
        items: [
          gridItemFactory({
            // size: 3,
            componentChildren: [
              gridFactory({
                columnGap: 'extraSmall',
                rowGap: 'extraSmall',
                items: [],
              }),
            ],
          }),
          gridItemFactory({
            // size: 3,
            componentChildren: [
              gridFactory({
                items: [
                  gridItemFactory({
                    size: 3,
                    componentChildren: [
                      selectFactory(
                        {
                          name: 'select-0',
                          label: 'Kennzahlbereich',
                          size: 'extraSmall',
                          mandatory: true,
                          'aria-label': 'text',
                          noneOption: { label: 'Kennzahlbereich auswählen', sfId: 'none' },
                          options: [
                            { label: 'Dev', sfId: 'option-0' },
                            { label: 'PM', sfId: 'option-1' },
                            { label: 'UI/UX', sfId: 'option-2' },
                          ],
                          onValueChange: [
                            {
                              type: 'request',
                              data: {
                                action: 'form-page',
                                targetId: 'select-0',
                                pageEvent: 'on-value-change',
                              },
                            },
                          ],
                        },
                        'select-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 3,
                    componentChildren: [
                      selectFactory(
                        {
                          name: 'select-1',
                          size: 'extraSmall',
                          mandatory: true,
                          label: 'Kennzahl',
                          'aria-label': 'text',
                          noneOption: { label: 'Kennzahl auswählen', sfId: 'none' },
                          noOptionsAvailableText: '- Kein Element vorhanden -',
                          options: [],
                          onValueChange: [
                            {
                              type: 'request',
                              data: {
                                action: 'form-page',
                                targetId: 'select-1',
                                pageEvent: 'on-value-change',
                              },
                            },
                          ],
                        },
                        'select-1',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 3,
                    componentChildren: [
                      dateFieldFactory(
                        {
                          label: 'Zeitraum',
                          name: 'date-field-0',
                          size: 'extraSmall',
                          mandatory: true,
                          format: 'DDMMYYYY',
                          onValueChange: [
                            {
                              type: 'request',
                              data: {
                                action: 'form-page',
                                targetId: 'date-field-0',
                                pageEvent: 'on-value-change',
                              },
                            },
                          ],
                        },
                        'date-field-0',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 3,
                    componentChildren: [
                      selectFactory(
                        {
                          name: 'select-2',
                          size: 'extraSmall',
                          mandatory: true,
                          label: 'Intervall',
                          'aria-label': 'text',
                          noneOption: { label: 'Intervall auswählen', sfId: 'none' },
                          noOptionsAvailableText: '- Kein Element vorhanden -',
                          options: [],
                          onValueChange: [
                            {
                              type: 'request',
                              data: {
                                action: 'form-page',
                                targetId: 'select-2',
                                pageEvent: 'on-value-change',
                              },
                            },
                          ],
                        },
                        'select-2',
                      ),
                    ],
                  }),
                  gridItemFactory({
                    size: 12,
                    componentChildren: [
                      gridFactory({
                        items: [
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                size: 'extraSmall',
                                text: 'Anzeigen',
                                color: 'primary',
                                href: '/',
                                corner: 'rounded',
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              badgeFactory({
                                text: '3',
                                color: 'primary',
                                anchor: buttonFactory({
                                  size: 'extraSmall',
                                  text: 'Erweiterte Filter',
                                  color: 'primary',
                                  href: '/',
                                  corner: 'rounded',
                                  variant: 'subtle',
                                }),
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
  },
  'form-1',
);
const rightContentHeader = gridFactory({
  // columnGap: 'none',
  rowGap: 'extraSmall',
  items: [
    gridItemFactory({
      componentChildren: [
        dataWidgetFactory(
          {
            label: 'Durchschnittswert',
            value: '1,25 Personen',
            icon: streamlineIconFactory({ name: 'information-circle' }),
            descriptionChildren: [
              gridFactory({
                columnGap: 'none',
                rowGap: 'none',
                items: [
                  gridItemFactory({
                    componentChildren: [
                      textFactory({
                        // fontSize: 'small',
                        text: 'Der Durchschnittswert der Kennzahl Krankheitsquote mit den ausgewählten Filtern beträgt 4.62 Prozent.Der Durchschnittswert der Kennzahl Krankheitsquote mit den ausgewählten Filtern beträgt 4.62 Prozent.Der Durchschnittswert der Kennzahl Krankheitsquote mit den ausgewählten Filtern beträgt 4.62 Prozent.Der Durchschnittswert der Kennzahl Krankheitsquote mit den ausgewählten Filtern beträgt 4.62 Prozent.',
                      }),
                    ],
                  }),
                  gridItemFactory({
                    componentChildren: [
                      buttonFactory({
                        size: 'small',
                        text: 'Wie wurde die Kennzahl ermittelt?',
                        variant: 'text',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          },
          undefined,
          'data-guide-test',
        ),
      ],
    }),
    gridItemFactory({
      componentChildren: [
        gridFactory({
          columnGap: 'none',
          rowGap: 'none',
          items: [
            gridItemFactory({
              componentChildren: [
                textFactory({
                  variant: 'subtle',
                  fontSize: 'extraSmall',
                  text: 'Hammer Time! : 2023-07-19T13:58:39+00:00',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
const contentHeaderChildrenProps = gridFactory({
  size: 12,
  items: [
    gridItemFactory({
      size: 6,
      componentChildren: [leftContentHeader],
    }),
    gridItemFactory({
      // size: 6,
      size: 3,
      offset: 3,
      componentChildren: [rightContentHeader],
    }),
  ],
});

const contentChildrenProps = panelGroupFactory({
  items: [
    panelGroupItemFactory({
      componentChildren: [
        headerAreaFactory({
          title: 'Anzahl Personen in einer Organisationseinheit',
          subtitle: 'Organisationseinheit Entwicklung und Produkt',
          // titleChildren: [streamlineIconFactory({ name: 'star' })],
          // subtitleChildren: [streamlineIconFactory({ name: 'star' })],
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
            // getDataGrid(),
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
            // barChartFactory(
            //   {
            //     tooltip: true,
            //     dataLabel: true,
            //     noDataText: 'First Text that is not default',
            //     dataHover: true,
            //     colorSet: 'bright',
            //     barLayout: 'vertical',
            //     barStacking: true,
            //     yAxis: {
            //       title: 'Count',
            //       // gridline: false,
            //       // majorTick: true,
            //       // majorTickAmount: 3,
            //       // majorTickInterval: 200,
            //       // minorTick: true,
            //       // majorTickStart: 176,
            //       // majorTickEnd: 8200,
            //     },
            //     xAxis: {
            //       type: 'datetime',
            //       pointStart: '2023-05-30',
            //       pointInterval: 1,
            //       pointIntervalUnit: 'month',
            //       title: 'Transportation',
            //       // majorTickAmount: 5,
            //       // gridline: true,
            //       // majorTick: true,
            //       // minorTick: true,
            //       // majorTickInterval: 10,
            //       // reversed: false,
            //       // categories: [
            //       //   'plane',
            //       //   'helicopter',
            //       //   'boat',
            //       //   'train',
            //       //   'subway',
            //       //   'bus',
            //       //   'car',
            //       //   'moto',
            //       //   'bicycle',
            //       //   'horse',
            //       //   'skateboard',
            //       //   'others',
            //       // ],
            //     },
            //     data: [
            //       {
            //         name: 'japan',
            //         value: [137, 79, 105, 40, 41, 200, null, 244, 274, 26, 122, 162],
            //       },
            //       {
            //         name: 'france',
            //         value: [248, 236, 105, 95, 279, 94, 22, 55, 2, 249, 57, 230],
            //       },
            //       {
            //         name: 'us',
            //         value: [52, 151, 219, 76, 248, 113, 105, 120, 284, 37, 285, 282],
            //       },
            //       {
            //         name: 'germany',
            //         value: [97, 222, 208, 96, 234, 58, 53, 89, 254, 227, 13, 130],
            //       },
            //       {
            //         name: 'norway',
            //         value: [135, 248, 272, 181, 142, 144, 252, 142, 261, 13, 149, 155],
            //       },
            //     ],
            //   },
            //   'bar-chart-1',
            // ),
          ],
        }),
      ],
    }),
    panelGroupItemFactory({
      componentChildren: [
        headerAreaFactory({
          flexToolbarChildren: [
            gridFactory({
              items: [
                gridItemFactory({
                  componentChildren: [
                    selectFactory(
                      {
                        name: 'select-0',
                        label: 'Kennzahlbereich',
                        size: 'extraSmall',
                        mandatory: true,
                        'aria-label': 'text',
                        noneOption: { label: 'Auswählen', sfId: 'none' },
                        fixedSize: 'extraLarge',
                        // minWidth: 150,
                        options: [
                          { label: 'Dev', sfId: 'option-0' },
                          { label: 'PM', sfId: 'option-1' },
                          { label: 'UI/UX', sfId: 'option-2' },
                          { label: 'Test', sfId: 'option-3' },
                          {
                            label: 'Dauer der Betriebszugehörigkeit',
                            sfId: 'option-4',
                          },
                          {
                            label: 'Organisationseinheit',
                            sfId: 'option-5',
                          },
                          {
                            label: 'Direkte Mitarbeiter von',
                            sfId: 'option-6',
                          },
                        ],
                        onValueChange: [
                          {
                            type: 'request',
                            data: {
                              action: 'form-page',
                              targetId: 'select-10',
                              pageEvent: 'on-value-change',
                            },
                          },
                        ],
                      },
                      'select-10',
                    ),
                  ],
                }),
                gridItemFactory({
                  componentChildren: [
                    selectFactory(
                      {
                        name: 'select-0',
                        label: 'Kennzahlbereich',
                        size: 'extraSmall',
                        mandatory: true,
                        'aria-label': 'text',
                        noneOption: { label: 'Auswählen', sfId: 'none' },
                        fixedSize: 'extraLarge',
                        // minWidth: 150,
                        options: [
                          { label: 'Dev', sfId: 'option-0' },
                          { label: 'PM', sfId: 'option-1' },
                          { label: 'UI/UX', sfId: 'option-2' },
                          { label: 'Test', sfId: 'option-3' },
                          {
                            label: 'Dauer der Betriebszugehörigkeit',
                            sfId: 'option-4',
                          },
                          {
                            label: 'Organisationseinheit',
                            sfId: 'option-5',
                          },
                          {
                            label: 'Direkte Mitarbeiter von',
                            sfId: 'option-6',
                          },
                        ],
                        onValueChange: [
                          {
                            type: 'request',
                            data: {
                              action: 'form-page',
                              targetId: 'select-11',
                              pageEvent: 'on-value-change',
                            },
                          },
                        ],
                      },
                      'select-11',
                    ),
                  ],
                }),
              ],
            }),
          ],
          toolbarChildren: [
            gridFactory({
              items: [
                gridItemFactory({
                  componentChildren: [
                    selectFactory(
                      {
                        name: 'select-0',
                        label: 'Kennzahlbereich',
                        size: 'extraSmall',
                        mandatory: true,
                        'aria-label': 'text',
                        noneOption: { label: 'Auswählen', sfId: 'none' },
                        fixedSize: 'extraLarge',
                        // minWidth: 150,
                        options: [
                          { label: 'Dev', sfId: 'option-0' },
                          { label: 'PM', sfId: 'option-1' },
                          { label: 'UI/UX', sfId: 'option-2' },
                          { label: 'Test', sfId: 'option-3' },
                          {
                            label: 'Dauer der Betriebszugehörigkeit',
                            sfId: 'option-4',
                          },
                          {
                            label: 'Organisationseinheit',
                            sfId: 'option-5',
                          },
                          {
                            label: 'Direkte Mitarbeiter von',
                            sfId: 'option-6',
                          },
                        ],
                        onValueChange: [
                          {
                            type: 'request',
                            data: {
                              action: 'form-page',
                              targetId: 'select-0',
                              pageEvent: 'on-value-change',
                            },
                          },
                        ],
                      },
                      'select-0',
                    ),
                  ],
                }),
                gridItemFactory({
                  componentChildren: [
                    dateFieldFactory(
                      {
                        label: 'Zeitraum',
                        name: 'date-field-0',
                        size: 'extraSmall',
                        mandatory: true,
                        format: 'DDMMYYYY',
                        onValueChange: [
                          {
                            type: 'request',
                            data: {
                              action: 'form-page',
                              targetId: 'date-field-0',
                              pageEvent: 'on-value-change',
                            },
                          },
                        ],
                      },
                      'date-field-0',
                    ),
                  ],
                }),
                gridItemFactory({
                  componentChildren: [
                    uiHandlerFactory({
                      defaultSize: 'medium',
                      componentChildren: [
                        iconButtonFactory({
                          variant: 'subtle',
                          icon: streamlineIconFactory({
                            name: 'analytics-bars',
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                gridItemFactory({
                  componentChildren: [
                    uiHandlerFactory({
                      defaultSize: 'medium',
                      componentChildren: [
                        iconButtonFactory({
                          variant: 'subtle',
                          icon: streamlineIconFactory({
                            name: 'navigation-menu-vertical',
                          }),
                        }),
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
                tooltip: true,
                dataHover: true,
                colorSet: 'secondary',
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
            ),
          ],
        }),
      ],
    }),
  ],
});

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const hrAnalyticsPage = smartFaceFactory({
  sfComponents: [
    uiHandlerFactory({
      sfId: 'id-f7d04f60-e526-4a6d-8d51-bbe5f612ce05',
      defaultFullHeight: true,
      defaultSize: 'extraSmall',
      iconSet: 'streamline',
      serviceToken:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjYyNTczNzExMzY0MDB9.-SJbbpiBY2Nz3GhPcuvYT2qVlOGiYziQB-jYI1diMC_aXuANtXKENO7Dr1lvy26QEB2csyhqeQBizU-pxJUb5g',
      componentChildren: [
        pageFactory({
          document: { head: { title: 'HR-Analytics Demo' } },
          componentChildren: [
            hrworksAdminLayoutFactory({
              activeNavigationItemSfId: 'id-a6b1dfcc-ccb9-4851-8b7b-7b540745467e',
              contentChildren: [
                sizeHandlerFactory({
                  height: '100%',
                  minHeight: 500,
                  componentChildren: [
                    panelGroupFactory({
                      items: [
                        panelGroupItemFactory({
                          size: 61.8,
                          componentChildren: [
                            headerAreaFactory({
                              toolbarChildren: [
                                flexboxFactory({
                                  items: [
                                    flexboxItemFactory({
                                      componentChildren: [
                                        iconButtonFactory({
                                          icon: streamlineIconFactory({ name: 'star' }),
                                          onClick: [
                                            {
                                              sfId: 'id-ce57894b-d594-4330-bb20-b73a7feded68',
                                              data: {
                                                nonce:
                                                  'd134x6xm2yLPguX6esLJ498uoPAXP2o0I4LfQ02RYD09ldN5NJss4+TR+onKrQhx',
                                              },
                                            },
                                          ],
                                          variant: 'subtle',
                                          size: 'medium',
                                        }),
                                      ],
                                    }),
                                    flexboxItemFactory({
                                      componentChildren: [
                                        dropdownMenuFactory({
                                          placement: 'bottom-end',
                                          trigger: iconButtonFactory({
                                            icon: streamlineIconFactory({ name: 'analytics-bars' }),
                                            variant: 'subtle',
                                            size: 'medium',
                                          }),
                                          componentParts: [
                                            dropdownMenuEntryFactory({ text: 'Linien' }),
                                            dropdownMenuEntryFactory({ text: 'S\u00E4ulen' }),
                                            dropdownMenuEntryFactory({ text: 'Balken' }),
                                            dropdownMenuEntryFactory({ text: 'Area' }),
                                            dropdownMenuEntryFactory({ text: 'Radar' }),
                                            dropdownMenuEntryFactory({ text: 'Kreis' }),
                                            dropdownMenuEntryFactory({
                                              onClick: [
                                                {
                                                  sfId: 'id-df60a245-3e88-4292-9dc3-9a9ccd62ce10',
                                                  data: {
                                                    nonce:
                                                      'Pl2AwoKh04IajBs1C64DuqsteOsCXHPCi8UFLknuRWycwofxcJx5Fhg9WiY2hUwr',
                                                  },
                                                },
                                              ],
                                              text: 'Tabelle',
                                            }),
                                          ],
                                          title: 'Anzeige',
                                        }),
                                      ],
                                    }),
                                    flexboxItemFactory({
                                      componentChildren: [
                                        dropdownMenuFactory({
                                          placement: 'bottom-end',
                                          trigger: iconButtonFactory({
                                            icon: streamlineIconFactory({ name: 'navigation-menu-vertical' }),
                                            variant: 'subtle',
                                            size: 'medium',
                                          }),
                                          componentParts: [
                                            dropdownMenuEntryFactory({
                                              onClick: [
                                                {
                                                  type: 'chart-action',
                                                  targetSfId: 'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                                  sfId: 'id-fa1807f2-6700-496e-8e03-abc9db367177',
                                                  action: 'fullscreen',
                                                },
                                              ],
                                              text: 'Vollbild',
                                            }),
                                            dropdownMenuEntryFactory({
                                              text: 'Download',
                                              componentParts: [
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      filename: 'My png \u0028master view\u0029',
                                                      type: 'chart-action',
                                                      targetSfId: 'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                                      sfId: 'id-a859df6d-7f24-4f96-a028-8befce50dc42',
                                                      action: 'export-as-png',
                                                    },
                                                  ],
                                                  text: 'PNG',
                                                }),
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      filename: 'My jpeg \u0028master view\u0029',
                                                      type: 'chart-action',
                                                      targetSfId: 'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                                      sfId: 'id-17ec8e69-33a8-434c-a4de-99d0d3deb954',
                                                      action: 'export-as-jpeg',
                                                    },
                                                  ],
                                                  text: 'JPEG',
                                                }),
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      filename: 'My svg \u0028master view\u0029',
                                                      type: 'chart-action',
                                                      targetSfId: 'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                                      sfId: 'id-826fd913-784b-4ab7-bf12-bac27b354ea8',
                                                      action: 'export-as-svg',
                                                    },
                                                  ],
                                                  text: 'SVG',
                                                }),
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      filename: 'My pdf \u0028master view\u0029',
                                                      type: 'chart-action',
                                                      targetSfId: 'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                                      sfId: 'id-fc3b39de-83c8-439d-b321-bc6cdd841fc5',
                                                      action: 'export-as-pdf',
                                                    },
                                                  ],
                                                  text: 'PDF',
                                                }),
                                                dropdownMenuEntryFactory({ text: 'CSV' }),
                                                dropdownMenuEntryFactory({ text: 'XLS' }),
                                              ],
                                            }),
                                            dropdownMenuEntryFactory({ text: 'Favoriten verwalten' }),
                                            dropdownMenuDividerFactory({}),
                                            dropdownMenuSectionFactory({
                                              componentParts: [
                                                dropdownMenuEntryFactory({ text: 'Mein Favorit 1' }),
                                                dropdownMenuEntryFactory({ text: 'Mein Favorit 2' }),
                                                dropdownMenuEntryFactory({ text: 'Mein Favorit 3' }),
                                              ],
                                              title: 'Favoriten',
                                            }),
                                          ],
                                          title: 'Men\u00FC',
                                        }),
                                      ],
                                    }),
                                  ],
                                  alignItems: 'center',
                                  gap: 'small',
                                }),
                              ],
                              componentChildren: [
                                barChartFactory(
                                  {
                                    legend: {
                                      verticalAlign: 'bottom',
                                      layout: 'horizontal',
                                      align: 'left',
                                    },
                                    colorSet: 'primary',
                                    data: [
                                      {
                                        name: 'Bar 1',
                                        value: [1, 3, 3, 7],
                                      },
                                      {
                                        name: 'Bar 2',
                                        value: [3, 5, 7, 11],
                                      },
                                      {
                                        name: 'Bar 3',
                                        value: [4, 2, 4, 2],
                                      },
                                      {
                                        name: 'Bar 4',
                                        value: [4, 3, 2, 1],
                                      },
                                      {
                                        name: 'Bar 5',
                                        value: [5, 2, 1, 5],
                                      },
                                      {
                                        name: 'Bar 6',
                                        value: [10, 10, 10, 10],
                                      },
                                      {
                                        name: 'Bar 7',
                                        value: [2, 4, 6, 8],
                                      },
                                      {
                                        name: 'Bar 8',
                                        value: [2, 3, 5, 7],
                                      },
                                      {
                                        name: 'Bar 9',
                                        value: [11, 13, 13, 11],
                                      },
                                      {
                                        name: 'Bar 10',
                                        value: [2, 5, 10, 3],
                                      },
                                    ],
                                  },
                                  'id-e21304ce-6834-4a88-8434-a8f2f56b1f25',
                                ),
                              ],
                              title: 'Anzahl Personen',
                              subtitle: 'Organisationseinheit',
                            }),
                          ],
                        }),
                        panelGroupItemFactory({
                          componentChildren: [
                            headerAreaFactory({
                              componentChildren: [
                                pieChartFactory(
                                  {
                                    legend: {
                                      verticalAlign: 'bottom',
                                      layout: 'horizontal',
                                      align: 'left',
                                    },
                                    colorSet: 'secondary',
                                    data: [
                                      {
                                        name: 'Piece 1',
                                        value: 41.65,
                                      },
                                      {
                                        name: 'Piece 2',
                                        value: 41.57,
                                      },
                                      {
                                        name: 'Piece 3',
                                        value: 8.46,
                                      },
                                      {
                                        name: 'Piece 4',
                                        value: 7.12,
                                      },
                                      {
                                        name: 'Piece 5',
                                        value: 1.2,
                                      },
                                    ],
                                  },
                                  'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                ),
                              ],
                              flexToolbarChildren: [
                                formFactory({
                                  componentChildren: [
                                    flexboxFactory({
                                      items: [
                                        flexboxItemFactory({
                                          flexShrink: { sm: 0 },
                                          flexGrow: {
                                            sm: 0,
                                            xs: 1,
                                          },
                                          flexBasis: '200px',
                                          componentChildren: [
                                            selectFactory({
                                              dropdownWidth: 'limited',
                                              name: 'id-9cf40300-51f7-4417-ab99-6962a6eb5f80',
                                              options: [
                                                {
                                                  sfId: 'id-3bb15c1f-be4d-4ca7-acf8-c19d7b4bd018',
                                                  label: 'Ansicht 1',
                                                },
                                                {
                                                  sfId: 'id-8cd6ec4e-82cd-4c72-9343-03cbd2222bd0',
                                                  label: 'Ansicht 2',
                                                },
                                                {
                                                  sfId: 'id-ff5dc8c7-1a0d-41b1-9812-a80ed08964cc',
                                                  label: 'Ansicht 3',
                                                },
                                                {
                                                  sfId: 'id-721bf1c5-75c2-4119-8d6d-b6c7659f40b1',
                                                  label:
                                                    'Ansicht 4 - Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam.',
                                                },
                                              ],
                                              label: 'Detailansicht',
                                              value: 'id-3bb15c1f-be4d-4ca7-acf8-c19d7b4bd018',
                                            }),
                                          ],
                                        }),
                                        flexboxItemFactory({
                                          flexShrink: { sm: 0 },
                                          flexGrow: {
                                            sm: 0,
                                            xs: 1,
                                          },
                                          flexBasis: '100px',
                                          componentChildren: [
                                            selectFactory({
                                              dropdownWidth: 'limited',
                                              name: 'id-fcdaa805-219f-45f8-b7a8-0e691aae9e1a',
                                              options: [
                                                {
                                                  sfId: 'id-41d15b8c-8cbb-4a4b-937e-2dac9d6e7631',
                                                  label: 'Monat',
                                                },
                                                {
                                                  sfId: 'id-23ead045-5669-47fa-8f41-92adaaab5f0d',
                                                  label: 'Jahr',
                                                },
                                              ],
                                              label: 'Zeitraum',
                                              value: 'id-2ae2ca66-9b2d-4383-9458-30aa6ebdc864',
                                            }),
                                          ],
                                        }),
                                        flexboxItemFactory({
                                          componentChildren: [
                                            dropdownMenuFactory({
                                              placement: 'bottom-end',
                                              trigger: iconButtonFactory({
                                                icon: streamlineIconFactory({ name: 'analytics-bars' }),
                                                variant: 'subtle',
                                                size: 'medium',
                                              }),
                                              componentParts: [
                                                dropdownMenuEntryFactory({ text: 'Linien' }),
                                                dropdownMenuEntryFactory({ text: 'S\u00E4ulen' }),
                                                dropdownMenuEntryFactory({ text: 'Balken' }),
                                                dropdownMenuEntryFactory({ text: 'Area' }),
                                                dropdownMenuEntryFactory({ text: 'Radar' }),
                                                dropdownMenuEntryFactory({ text: 'Kreis' }),
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      sfId: 'id-fe288d58-da29-4d3a-bda4-20d69711b26e',
                                                      data: {
                                                        nonce:
                                                          'K+9VcfPelgJxz/l2Gr2H20IvebBqtEzSRlJyVVgjXLvnya1qHrAtL1yuOkFkDiWa',
                                                      },
                                                    },
                                                  ],
                                                  text: 'Tabelle',
                                                }),
                                              ],
                                              title: 'Anzeige',
                                            }),
                                          ],
                                        }),
                                        flexboxItemFactory({
                                          componentChildren: [
                                            dropdownMenuFactory({
                                              placement: 'bottom-end',
                                              trigger: iconButtonFactory({
                                                icon: streamlineIconFactory({ name: 'navigation-menu-vertical' }),
                                                variant: 'subtle',
                                                size: 'medium',
                                              }),
                                              componentParts: [
                                                dropdownMenuEntryFactory({
                                                  onClick: [
                                                    {
                                                      type: 'chart-action',
                                                      targetSfId: 'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                                      sfId: 'id-39d7fa34-ec91-4ee4-947d-7baeb092a378',
                                                      action: 'fullscreen',
                                                    },
                                                  ],
                                                  text: 'Vollbild',
                                                }),
                                                dropdownMenuEntryFactory({
                                                  text: 'Download',
                                                  componentParts: [
                                                    dropdownMenuEntryFactory({
                                                      onClick: [
                                                        {
                                                          filename: 'My png \u0028detail view\u0029',
                                                          type: 'chart-action',
                                                          targetSfId: 'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                                          sfId: 'id-2cac6a40-7574-44d9-b895-64b84568aba0',
                                                          action: 'export-as-png',
                                                        },
                                                      ],
                                                      text: 'PNG',
                                                    }),
                                                    dropdownMenuEntryFactory({
                                                      onClick: [
                                                        {
                                                          filename: 'My jpeg \u0028detail view\u0029',
                                                          type: 'chart-action',
                                                          targetSfId: 'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                                          sfId: 'id-c8848c42-13d0-434c-b7fc-a6ca79790fb9',
                                                          action: 'export-as-jpeg',
                                                        },
                                                      ],
                                                      text: 'JPEG',
                                                    }),
                                                    dropdownMenuEntryFactory({
                                                      onClick: [
                                                        {
                                                          filename: 'My svg \u0028detail view\u0029',
                                                          type: 'chart-action',
                                                          targetSfId: 'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                                          sfId: 'id-098fa23b-2687-4a78-8ef4-f506074f40fb',
                                                          action: 'export-as-svg',
                                                        },
                                                      ],
                                                      text: 'SVG',
                                                    }),
                                                    dropdownMenuEntryFactory({
                                                      onClick: [
                                                        {
                                                          filename: 'My pdf \u0028detail view\u0029',
                                                          type: 'chart-action',
                                                          targetSfId: 'id-0bce5f45-0c8d-401a-9247-6c218a5871ac',
                                                          sfId: 'id-d0fead56-9179-4fca-b902-b959a8888ca4',
                                                          action: 'export-as-pdf',
                                                        },
                                                      ],
                                                      text: 'PDF',
                                                    }),
                                                    dropdownMenuEntryFactory({ text: 'CSV' }),
                                                    dropdownMenuEntryFactory({ text: 'XLS' }),
                                                  ],
                                                }),
                                                dropdownMenuEntryFactory({ text: 'Favoriten verwalten' }),
                                                dropdownMenuDividerFactory({}),
                                                dropdownMenuSectionFactory({
                                                  componentParts: [
                                                    dropdownMenuEntryFactory({ text: 'Mein Favorit 1' }),
                                                    dropdownMenuEntryFactory({ text: 'Mein Favorit 2' }),
                                                    dropdownMenuEntryFactory({ text: 'Mein Favorit 3' }),
                                                  ],
                                                  title: 'Favoriten',
                                                }),
                                              ],
                                              title: 'Men\u00FC',
                                            }),
                                          ],
                                        }),
                                      ],
                                      alignItems: 'center',
                                      justifyContent: 'flex-end',
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
              header: {
                logo: {
                  src: 'https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe.png',
                  alt: 'This is a logo',
                  target: '_blank',
                },
                componentChildren: [
                  dropdownMenuFactory({
                    placement: 'bottom-end',
                    trigger: hrworksAdminLayoutProfileImageFactory({
                      src: 'https\u003A//lh3.googleusercontent.com/a/ACg8ocIm75mA1EapH19aqwbmHHGfSeiNIZAKXa8VfRHzoXxrF7B7meS9=s96-c',
                      alt: 'Marko Guastella',
                    }),
                    componentParts: [
                      dropdownMenuEntryFactory({ text: 'Entry 1' }),
                      dropdownMenuEntryFactory({ text: 'Entry 2' }),
                      dropdownMenuEntryFactory({ text: 'Entry 3' }),
                    ],
                  }),
                ],
                navigationItems: [
                  {
                    text: 'Dashboard',
                    sfId: 'id-7b083a0b-4b4d-4480-8598-537b55a6ef88',
                  },
                  {
                    text: 'HR-Analytics',
                    sfId: 'id-a6b1dfcc-ccb9-4851-8b7b-7b540745467e',
                  },
                  {
                    text: 'Organigramm',
                    sfId: 'id-2bc36f0d-49ff-4f47-b71f-6ef273dae079',
                  },
                ],
              },
              contentHeaderChildren: [
                formFactory({
                  componentChildren: [
                    gridFactory({
                      items: [
                        gridItemFactory({
                          size: {
                            xs: 12,
                            md: 6,
                            xl: 6,
                          },
                          componentChildren: [
                            gridFactory({
                              fullHeight: false,
                              items: [
                                gridItemFactory({
                                  size: {
                                    lg: 6,
                                    sm: 6,
                                    xs: 12,
                                    md: 12,
                                    xl: 3,
                                  },
                                  componentChildren: [
                                    selectFactory({
                                      name: 'id-1855b3a5-ef63-49e5-91d3-085191b18e63',
                                      options: [
                                        {
                                          sfId: 'id-656de541-640e-4afd-b9b9-c78efa48220a',
                                          label: 'Kennzahlbereich 1',
                                        },
                                        {
                                          sfId: 'id-f83d2bed-5f93-4deb-b597-ab43a6d139c8',
                                          label: 'Kennzahlbereich 2',
                                        },
                                        {
                                          sfId: 'id-9febb687-d62d-4b2b-a161-ffc0db853573',
                                          label: 'Kennzahlbereich 3',
                                        },
                                      ],
                                      label: 'Kennzahlbereich',
                                      value: 'id-656de541-640e-4afd-b9b9-c78efa48220a',
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: {
                                    lg: 6,
                                    sm: 6,
                                    xs: 12,
                                    md: 12,
                                    xl: 3,
                                  },
                                  componentChildren: [
                                    selectFactory({
                                      name: 'id-c67cff0e-6a36-4d03-823a-422364dfa662',
                                      options: [
                                        {
                                          sfId: 'id-e65c1942-a32f-4d25-971d-2f824a7454dd',
                                          label: 'Kennzahl 1',
                                        },
                                        {
                                          sfId: 'id-a43a94a4-f4a5-43a1-aaf3-a4b1ba6cd4cf',
                                          label: 'Kennzahl 2',
                                        },
                                        {
                                          sfId: 'id-fc367c87-f7f9-4388-afac-542d117ceabc',
                                          label: 'Kennzahl 3',
                                        },
                                      ],
                                      label: 'Kennzahl',
                                      value: 'id-e65c1942-a32f-4d25-971d-2f824a7454dd',
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: {
                                    lg: 6,
                                    sm: 6,
                                    xs: 12,
                                    md: 12,
                                    xl: 3,
                                  },
                                  componentChildren: [
                                    dateRangeFieldFactory({
                                      minValue: '1925-01-29',
                                      maxValue: '2125-01-29',
                                      name: 'id-baea7b75-fe31-44bd-991f-6b9851b6985a',
                                      label: 'Zeitraum',
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  size: {
                                    lg: 6,
                                    sm: 6,
                                    xs: 12,
                                    md: 12,
                                    xl: 3,
                                  },
                                  componentChildren: [
                                    selectFactory({
                                      name: 'id-7c470cd6-9831-4fbe-b329-bcde3a1aba28',
                                      options: [
                                        {
                                          sfId: 'id-41d15b8c-8cbb-4a4b-937e-2dac9d6e7631',
                                          label: 'Monat',
                                        },
                                        {
                                          sfId: 'id-23ead045-5669-47fa-8f41-92adaaab5f0d',
                                          label: 'Jahr',
                                        },
                                      ],
                                      label: 'Intervall',
                                      value: 'id-41d15b8c-8cbb-4a4b-937e-2dac9d6e7631',
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  componentChildren: [
                                    flexboxFactory({
                                      items: [
                                        flexboxItemFactory({
                                          componentChildren: [
                                            buttonFactory({
                                              onClick: [
                                                {
                                                  sfId: 'id-68d418d4-035a-4b92-8386-bfe06d6ae3f9',
                                                  data: {
                                                    nonce:
                                                      'sJpW8zNm214CCBUmOSUE5Ned74nTxtI9M5V+K9yNt2wkW/diuKGWr7It7nEFQgMh',
                                                  },
                                                },
                                              ],
                                              text: 'Anzeigen',
                                            }),
                                          ],
                                        }),
                                        flexboxItemFactory({
                                          componentChildren: [
                                            badgeFactory({
                                              anchor: buttonFactory({
                                                onClick: [
                                                  {
                                                    sfId: 'id-765e1404-d511-41fc-928f-db34d6b910e0',
                                                    data: {
                                                      nonce:
                                                        '0CeHLA9SI/MaUP4xDHE184KgtzsAiTg7ZHFyXdh/lKGt7qVow11iv+BudoYw4Wvp',
                                                    },
                                                  },
                                                ],
                                                variant: 'subtle',
                                                text: 'Erweiterte Filter',
                                              }),
                                              text: '3',
                                              fixedSize: true,
                                            }),
                                          ],
                                        }),
                                      ],
                                      gap: 'small',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        gridItemFactory({
                          offset: {
                            lg: 3,
                          },
                          size: {
                            lg: 3,
                            xs: 12,
                            md: 6,
                          },
                          componentChildren: [
                            gridFactory({
                              items: [
                                gridItemFactory({
                                  componentChildren: [
                                    dataWidgetFactory({
                                      icon: streamlineIconFactory({ name: 'information-circle' }),
                                      descriptionChildren: [
                                        gridFactory({
                                          rowGap: 'none',
                                          items: [
                                            gridItemFactory({
                                              componentChildren: [
                                                textFactory({
                                                  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                                                }),
                                              ],
                                            }),
                                            gridItemFactory({
                                              componentChildren: [
                                                textFactory({
                                                  href: 'https\u003A//help.hrworks.de/wie-verwalte-und-analysiere-ich-kennzahlen-mit-hr-analytics',
                                                  target: '_blank',
                                                  text: 'Wie wurde die Kennzahl ermittelt?',
                                                  color: 'primary',
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                      value: '1,25 Personen',
                                      label: 'Durchschnittswert',
                                    }),
                                  ],
                                }),
                                gridItemFactory({
                                  componentChildren: [
                                    flexboxFactory({
                                      items: [
                                        flexboxItemFactory({
                                          componentChildren: [
                                            textFactory({
                                              variant: 'subtle',
                                              text: 'Letzte Aktualisierung\u003A 01/29/25\u00A014\u003A50 Uhr',
                                              hover: true,
                                            }),
                                          ],
                                        }),
                                      ],
                                      justifyContent: 'flex-end',
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
      ],
      treeGraphExportServiceUrl: 'https\u003A//export.testing-hrworks.de/api/treeGraph/latest',
    }),
  ],

  sideEffects: [
    {
      type: 'addNotification',
      id: 'notification-0',
      message: 'Willkommen bei HRanalytics',
      duration: 'infinite',
    },
  ],
});
