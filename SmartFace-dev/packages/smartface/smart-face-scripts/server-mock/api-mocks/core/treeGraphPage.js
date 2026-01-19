// @ts-check
import jwt from 'jsonwebtoken';

import { hrworksAdminLayoutFactory } from '../../../../shared/smartFaceComponentFactories/application/hrworks-admin/hrworksAdminLayoutFactory.js';
import { hrworksAdminLayoutProfileImageFactory } from '../../../../shared/smartFaceComponentFactories/application/hrworks-admin/hrworksAdminLayoutProfileImageFactory.js';
import { badgeFactory } from '../../../../shared/smartFaceComponentFactories/core/badgeFactory.js';
import { buttonFactory } from '../../../../shared/smartFaceComponentFactories/core/buttonFactory.js';
import { dateFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/dateFieldFactory.js';
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
import { selectFactory } from '../../../../shared/smartFaceComponentFactories/core/selectFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import {
  treeGraphEntryFactory,
  treeGraphFactory,
} from '../../../../shared/smartFaceComponentFactories/core/treeGraphFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { getPlaceholderImage } from '../../../shared/getPlaceholderImage.js';
// import times from 'lodash/times.js';

const secret = 'myCustomSecret123'; // removed for security reasons
const workingToken = jwt.sign({ user_id: '123' }, secret, { expiresIn: '4h' });
// const expiredToken = jwt.sign({ user_id: '123' }, secret, { expiresIn: '1s' });
// const invalidToken = jwt.sign({ user_id: '123' }, 'secret', { expiresIn: '1y' });

const placeholderImg = getPlaceholderImage(100, 100);

export const treeGraph = treeGraphFactory(
  {
    exportServiceUrl: 'http://localhost:5000/api/treeGraph/latest',
    showMiniMap: true,
    showControls: true,
    // exportLimit: 1500,
    fullHeight: true,
    leafGroupingThreshold: 2,
    // leafGroupingThreshold Best to test in useTreeLayout where it gets called.
    controlsChildren: [
      dropdownMenuFactory({
        trigger: iconButtonFactory({
          icon: streamlineIconFactory({ name: 'common-file-download' }),
          size: 'extraLarge',
        }),
        placement: 'top-end',
        componentParts: [
          dropdownMenuSectionFactory({
            title: 'Export as...',
            componentParts: [
              dropdownMenuEntryFactory({
                text: 'PNG',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-png',
                    filename: 'Abso lu%t& in.(.jpg) akzeptabel;',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'JPEG',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-jpeg',
                    filename: 'customFileName',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'PDF',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'export-as-pdf',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'Print',
                onClick: [
                  {
                    type: 'tree-graph-action',
                    action: 'print',
                    targetSfId: 'treeGraph-01',
                  },
                ],
              }),
              dropdownMenuEntryFactory({
                text: 'Change Language to EN',
                onClick: [
                  {
                    type: 'request',
                    data: {
                      action: 'reflect',
                      reflectedData: {
                        sideEffects: [
                          {
                            type: 'updateSmartFaceBackendConfig',
                            fields: {
                              sfLocale: 'en',
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
    entries: [
      /* ...times(300, () =>
        treeGraphEntryFactory({
          title: 'Node',
          subtitle: 'Node',
          imageSrc: placeholderImg,
          subsubtitle: 'Node',
        }),
      ), */
      treeGraphEntryFactory(
        {
          title: 'Willi Bösch',
          subtitle: 'Node',
          entries: [
            treeGraphEntryFactory(
              {
                title: 'Oliver Born',
                subtitle: 'Node',
                onLoadChildEntries: [
                  {
                    type: 'request',
                    data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadBornEntries' },
                  },
                ],
              },
              undefined,
              'data-guide-test',
            ),
            treeGraphEntryFactory({
              title: 'Kurt Fischer',
              subtitle: 'Node',
              variant: 'greyedOut',
            }),
            treeGraphEntryFactory({
              title: 'Nino Filipovic',
              subtitle: 'Node',
              variant: 'greyedOut',
            }),
          ],
        },
        undefined,
        'data-guide-test',
      ),
      treeGraphEntryFactory(
        {
          title: 'Simeon Sembachmiteinemlangennamen',
          subtitle: 'Entwicklung',
          subsubtitle: 'Teamlei',
          variant: 'highlighted',
          imageSrc: placeholderImg,
          onClick: [
            {
              type: 'request',
              data: { action: 'tree-graph', pageEvent: 'onClickCard' },
            },
          ],
          isExpanded: false,
          entries: [
            treeGraphEntryFactory({
              title: 'David Wichmann',
              subtitle: 'Entwicklung',
              subsubtitle: 'Professional Entwickler',
              imageSrc: placeholderImg,
              isExpanded: false,
              entries: [
                treeGraphEntryFactory({
                  title: 'Node',
                  subtitle: 'Node',
                  imageSrc: placeholderImg,
                  subsubtitle: 'Node',
                }),
              ],
            }),
            treeGraphEntryFactory({
              title: 'Alexander Kiefer',
              subtitle: 'Entwicklung',
              subsubtitle: 'Entwickler',
              imageSrc: placeholderImg,
              onClick: [
                {
                  type: 'request',
                  data: { action: 'tree-graph', pageEvent: 'onClickCard' },
                },
              ],
            }),
            treeGraphEntryFactory({
              title: 'Jacqueline Kraus',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwicklerin',
              imageSrc: placeholderImg,
              variant: 'highlighted',
            }),
            treeGraphEntryFactory({
              title: 'Nedir Moulgada',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: placeholderImg,
            }),
            treeGraphEntryFactory({
              title: 'Marko Guastella',
              subtitle: 'Entwicklung',
              subsubtitle: 'Thesist',
              imageSrc: placeholderImg,
            }),
            treeGraphEntryFactory({
              title: 'Lukas Fettig',
              subtitle: 'Entwicklung',
              variant: 'greyedOut',
              subsubtitle: 'Werkstudent',
              imageSrc: placeholderImg,
            }),
          ],
        },
        '1300',
      ),
      treeGraphEntryFactory(
        {
          title: 'Simeon Sembachmiteinemlangennamen',
          subtitle: 'Entwicklung',
          subsubtitle: 'Teamleiter',
          variant: 'highlighted',
          imageSrc: placeholderImg,
          onClick: [
            {
              type: 'request',
              data: { action: 'tree-graph', pageEvent: 'onClickCard' },
            },
          ],
          isExpanded: false,
          entries: [
            treeGraphEntryFactory({
              title: 'David Wichmann',
              subtitle: 'Entwicklung',
              subsubtitle: 'Professional Entwickler',
              imageSrc: placeholderImg,
              isExpanded: false,
              entries: [
                treeGraphEntryFactory({
                  title: 'Node',
                  subtitle: 'Node',
                  imageSrc: placeholderImg,
                  subsubtitle: 'Node',
                }),
              ],
            }),
            treeGraphEntryFactory({
              title: 'Alexander Kiefer',
              subtitle: 'Entwicklung',
              subsubtitle: 'Senior Onclickler',
              imageSrc: placeholderImg,
              onClick: [
                {
                  type: 'request',
                  data: { action: 'tree-graph', pageEvent: 'onClickCard' },
                },
              ],
            }),
            treeGraphEntryFactory({
              title: 'Jacqueline Kraus',
              subtitle: 'Entwicklung',
              variant: 'highlighted',
              subsubtitle: 'Junior Entwicklerin',
              imageSrc: placeholderImg,
            }),
            treeGraphEntryFactory({
              title: 'Nedir Moulgada',
              subtitle: 'Entwicklung',
              subsubtitle: 'Junior Entwickler',
              imageSrc: placeholderImg,
            }),
            treeGraphEntryFactory({
              title: 'Marko Guastella',
              subtitle: 'Entwicklung',
              subsubtitle: 'Thesist',
              imageSrc: placeholderImg,
            }),
            treeGraphEntryFactory({
              title: 'Lukas Fettig',
              subtitle: 'Entwicklung',
              variant: 'greyedOut',
              subsubtitle: 'Werkstudent',
              imageSrc: placeholderImg,
            }),
          ],
        },
        '1200',
      ),
      treeGraphEntryFactory(
        {
          title: 'Markus Schunk',
          subtitle: 'HRworks Holding',
          imageSrc: placeholderImg,
          subsubtitle: 'CEO',
          entries: [
            treeGraphEntryFactory({
              title: 'Simon Franz',
              subtitle: 'Entwicklung',
              subsubtitle: 'Bereichsleiter',
              imageSrc: placeholderImg,
              entries: [
                treeGraphEntryFactory(
                  {
                    title: 'Simeon Sembach',
                    subtitle: 'Entwicklung',
                    subsubtitle: 'Teamleiter',
                    variant: 'highlighted',
                    imageSrc: placeholderImg,
                    onClick: [
                      {
                        type: 'request',
                        data: { action: 'tree-graph', pageEvent: 'onClickCard' },
                      },
                    ],
                    isExpanded: false,
                    entries: [
                      treeGraphEntryFactory({
                        title: 'David Wichmann',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Professional Entwickler',
                        imageSrc: placeholderImg,
                        onLoadChildEntries: [
                          {
                            type: 'request',
                            data: { backendLoad: 98, action: 'tree-graph', pageEvent: 'loadEntries' },
                          },
                        ],
                      }),
                      treeGraphEntryFactory({
                        title: 'Alexander Kiefer',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwickler',
                        imageSrc: placeholderImg,
                      }),
                      treeGraphEntryFactory({
                        title: 'Jacqueline Kraus',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwicklerin',
                        imageSrc: placeholderImg,
                      }),
                      treeGraphEntryFactory({
                        title: 'Nedir Moulgada',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Junior Entwickler',
                        imageSrc: placeholderImg,
                      }),
                      treeGraphEntryFactory({
                        title: 'Marko Guastella',
                        subtitle: 'Entwicklung',
                        subsubtitle: 'Thesist',
                        imageSrc: placeholderImg,
                      }),
                      treeGraphEntryFactory({
                        title: 'Lukas Fettig',
                        subtitle: 'Entwicklung',
                        variant: 'greyedOut',
                        subsubtitle: 'Werkstudent',
                        imageSrc: placeholderImg,
                      }),
                    ],
                  },
                  '1000',
                ),
              ],
            }),
          ],
        },
        'entry-1',
      ),
      treeGraphEntryFactory({
        title: 'Zweiter Baum',
        subtitle: 'Ohne Inhalt',
        entries: [
          treeGraphEntryFactory({
            title: 'Lukas Fettig',
            subtitle: 'Entwicklung',
            variant: 'greyedOut',
            subsubtitle: 'Werkstudent',
            imageSrc: placeholderImg,
            onLoadChildEntries: [
              {
                type: 'request',
                data: { backendLoad: 478, action: 'tree-graph', pageEvent: 'loadEntries' },
              },
            ],
          }),
        ],
      }),
      treeGraphEntryFactory({
        title: 'Dritter Baum',
        subtitle: 'Ohne Inhalt',
        entries: [treeGraphEntryFactory()],
      }),
    ],
  },
  'treeGraph-01',
  'data-guide-test',
);

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
                                text: 'fullHeight: true',
                                color: 'primary',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'reflect',
                                      reflectedData: {
                                        sideEffects: [
                                          {
                                            type: 'patch',
                                            updates: [
                                              {
                                                operation: 'write',
                                                targetSfId: 'treeGraph-01',
                                                path: 'props.fullHeight',
                                                value: true,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                size: 'extraSmall',
                                text: 'fullHeight: false',
                                color: 'primary',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: {
                                      action: 'reflect',
                                      reflectedData: {
                                        sideEffects: [
                                          {
                                            type: 'patch',
                                            updates: [
                                              {
                                                operation: 'write',
                                                targetSfId: 'treeGraph-01',
                                                path: 'props.fullHeight',
                                                value: false,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    },
                                  },
                                ],
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                size: 'extraSmall',
                                text: 'Toggle Variants',
                                color: 'primary',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: { action: 'tree-graph', pageEvent: 'highlight' },
                                  },
                                ],
                                corner: 'rounded',
                              }),
                            ],
                          }),
                          gridItemFactory({
                            componentChildren: [
                              buttonFactory({
                                size: 'extraSmall',
                                text: 'Replace Nodes from Backend',
                                color: 'primary',
                                onClick: [
                                  {
                                    type: 'request',
                                    data: { action: 'tree-graph', pageEvent: 'resetNodes' },
                                  },
                                ],
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

const contentHeaderChildrenProps = gridFactory({
  size: 12,
  items: [
    gridItemFactory({
      size: 6,
      componentChildren: [leftContentHeader],
    }),
  ],
});

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const treeGraphPage = smartFaceFactory({
  sfComponents: [
    uiHandlerFactory({
      serviceToken: workingToken,
      // serviceToken: expiredToken,
      // serviceToken: invalidToken,
      componentChildren: [
        pageFactory(
          {
            document: { head: { title: 'TreeGraph' } },
            componentChildren: [
              hrworksAdminLayoutFactory({
                activeNavigationItemSfId: 'id-analytics',
                header: {
                  logo: {
                    src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png',
                    alt: 'logo',
                    href: '#',
                  },
                  navigationItems: [{ text: 'Organigramm', sfId: 'id-analytics', href: '/treeGraph' }],
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
                                trigger: hrworksAdminLayoutProfileImageFactory({}),
                              }),
                            ],
                          }),
                        ],
                      },
                      'grid-0',
                    ),
                  ],
                },
                contentHeaderChildren: [contentHeaderChildrenProps],
                contentChildren: [
                  uiHandlerFactory({
                    // treeGraphExportServiceUrl: 'bullshit', // should be overwritten by treeGraphFactory Prop
                    componentChildren: [treeGraph],
                  }),
                ],
              }),
            ],
          },
          'page-01',
        ),
      ],
    }),
  ],
});
