// @ts-check
import { hrworksAdminLayoutFactory } from '../../../../../shared/smartFaceComponentFactories/application/hrworks-admin/hrworksAdminLayoutFactory.js';
import { cardFactory } from '../../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { fontAwesomeIconFactory } from '../../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { profileMenuFactory } from '../../../../../shared/smartFaceComponentFactories/extension/profileMenuFactory.js';

/**
 * @type { import('../../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */

export const dashboardPage = smartFaceFactory({
  sfComponents: [
    pageFactory(
      {
        componentChildren: [
          hrworksAdminLayoutFactory({
            activeNavigationItemSfId: 'id-dashboard',
            header: {
              logo: {
                src: 'https://d9yw7530xbzu.cloudfront.net/assets/HRW_Logo_mit_Claim_Farbe.png',
                alt: 'logo',
                href: '#',
              },
              navigationItems: [
                {
                  text: 'Dashboard',
                  sfId: 'id-dashboard',
                  onClick: [
                    {
                      type: 'request',
                      data: {
                        action: 'reflect',
                        reflectedData: {
                          sideEffects: [
                            { type: 'consoleMessage', message: 'Navigating to Analytics' },
                            { type: 'redirect', url: 'dashboard' },
                          ],
                        },
                      },
                    },
                  ],
                },
                { text: 'HR-Analytics', sfId: 'id-analytics', href: '/hrAnalytics' },
              ],
              componentChildren: [
                gridFactory(
                  {
                    items: [
                      gridItemFactory({
                        componentChildren: [fontAwesomeIconFactory()],
                      }),
                      gridItemFactory({
                        componentChildren: [fontAwesomeIconFactory()],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          profileMenuFactory({
                            portrait: { src: 'ui-assets/pictures/profile.jpg' },
                            title: 'John Doe',
                            subtitle: 'A very anonymous',
                            headerChildren: [fontAwesomeIconFactory()],
                            bodyChildren: [fontAwesomeIconFactory()],
                          }),
                        ],
                      }),
                    ],
                  },
                  'grid-0',
                ),
              ],
            },
            contentHeaderChildren: [
              gridFactory(
                {
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        cardFactory({
                          title: 'DASHBOARD => CONTENT-HEADER: HrAnalytics - A Card Placeholder',
                          subtitle: 'placeholder',
                          icon: fontAwesomeIconFactory(),
                          bodyChildren: [
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                'grid-1',
              ),
            ],
            contentChildren: [
              gridFactory(
                {
                  items: [
                    gridItemFactory({
                      componentChildren: [
                        cardFactory({
                          title: 'DASHBOARD => CONTENT: HrAnalytics - A Card Placeholder',
                          subtitle: 'placeholder',
                          icon: fontAwesomeIconFactory(),
                          bodyChildren: [
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                            fontAwesomeIconFactory(),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                'grid-2',
              ),
            ],
          }),
        ],
      },
      'page-0',
    ),
  ],
});
