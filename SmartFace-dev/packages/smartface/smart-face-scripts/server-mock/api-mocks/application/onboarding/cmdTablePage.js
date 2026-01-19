// @ts-check
import {
  cmdTableFactory,
  cmdTableItemFactory,
} from '../../../../../shared/smartFaceComponentFactories/application/onboarding/cmdTableFactory.js';
import { cardFactory } from '../../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { sidebar } from '../../shared/sidebar.js';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const cmdTablePage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        componentChildren: [
          classicLayoutFactory({
            sidebar: sidebar('cmd-table-page', ['onboarding-pages']),
            content: {
              componentChildren: [
                gridFactory(
                  {
                    items: [
                      gridItemFactory({
                        componentChildren: [
                          cardFactory({
                            title: 'CMD Table Page',
                            subtitle: 'Read & Confirm your Compliance Management Documents',
                            icon: fontAwesomeIconFactory(),
                            bodyChildren: [
                              cmdTableFactory(
                                {
                                  items: [
                                    cmdTableItemFactory(
                                      {
                                        title: 'Reisekosten- und Bewirtungsrichtlinie 12.06.2019',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-0',
                                            },
                                          },
                                        ],
                                      },
                                      'item-0',
                                      'data-guide-test',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title:
                                          "We're no Strangers to love, Baby. You know the Rules and so do i. - Today",
                                        url: '',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-1',
                                            },
                                          },
                                        ],
                                      },
                                      'item-1',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title:
                                          '3G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.20203G-Status-Nachweis 11.09.2020',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: true,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-2',
                                            },
                                          },
                                        ],
                                      },
                                      'item-2',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title: 'Datenschutzinformationen für Mitarbeiter 24.02.2022',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-3',
                                            },
                                          },
                                        ],
                                      },
                                      'item-3',
                                    ),
                                    cmdTableItemFactory(
                                      {
                                        title: 'IT-Sicherheitsrichtlinie 24.02.2022',
                                        url: 'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        confirmed: false,
                                        signingUrl:
                                          'https://xd.adobe.com/view/e07b9829-5e82-46f4-bee6-85e94edad468-b528/screen/fc64b451-b97d-4452-a1b2-8f8dc0477fcd/',
                                        onButtonClick: [
                                          {
                                            type: 'request',
                                            blockUi: false,
                                            data: {
                                              customString: 'Compliance Document Confirmed.',
                                              action: 'cmd-table-page',
                                              pageEvent: 'item-4',
                                            },
                                          },
                                        ],
                                      },
                                      'item-4',
                                    ),
                                  ],
                                },
                                undefined,
                                'data-guide-test',
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  'grid-0',
                ),
              ],
            },
          }),
        ],
      },
      'page-0',
    ),
  ],
});
