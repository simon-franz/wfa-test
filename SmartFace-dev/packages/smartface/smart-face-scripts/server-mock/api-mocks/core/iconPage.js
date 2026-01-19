// @ts-check

import { materialDesignIconFactory } from '#shared/smartFaceComponentFactories/core/materialDesignIconFactory';

import {
  accordionFactory,
  accordionItemFactory,
} from '../../../../shared/smartFaceComponentFactories/core/accordionFactory.js';
import { cardFactory } from '../../../../shared/smartFaceComponentFactories/core/cardFactory.js';
import { classicLayoutFactory } from '../../../../shared/smartFaceComponentFactories/core/classicLayoutFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';
import { gridFactory, gridItemFactory } from '../../../../shared/smartFaceComponentFactories/core/gridFactory.js';
import { pageFactory } from '../../../../shared/smartFaceComponentFactories/core/pageFactory.js';
import { smartFaceFactory } from '../../../../shared/smartFaceComponentFactories/core/smartFaceFactory.js';
import { streamlineIconFactory } from '../../../../shared/smartFaceComponentFactories/core/streamlineIconFactory.js';
import { textFieldFactory } from '../../../../shared/smartFaceComponentFactories/core/textFieldFactory.js';
import { uiHandlerFactory } from '../../../../shared/smartFaceComponentFactories/core/uiHandlerFactory.js';
import { sidebar } from '../shared/sidebar.js';

// Here to stay
const iconArr = [];
iconArr.push(textFieldFactory({}));
for (let i = 0; i < 100; i++) {
  iconArr.push(fontAwesomeIconFactory({ name: 'snowman', variant: 'duotone' }));
}

// MATERIALDESIGN-VARIANTS
const materialDesignVariantIcons = [];
materialDesignVariantIcons.push(textFieldFactory({}));

const materialDesignIconNames = [
  'schedule',
  'expand_less',
  'expand_more',
  'add',
  'remove',
  'close',
  'check',
  'menu',
  'keyboard_arrow_right',
  'calendar_today',
  'keyboard_arrow_left',
  'visibility_off',
  'visibility',
  'download',
  'open_in_new',
  'print',
  'info',
  'view_column',
  'more_vert',
  'format_line_spacing',
  'filter_alt',
  'push_pin',
  'arrow_upward',
  'arrow_downward',
  'fullscreen',
];

const filled = materialDesignIconNames.map((iconName) =>
  materialDesignIconFactory({ name: iconName, variant: 'filled' }, `material-filled-${iconName}`),
);
const outlined = materialDesignIconNames.map((iconName) =>
  materialDesignIconFactory({ name: iconName, variant: 'outlined' }, `material-outlined-${iconName}`),
);
const round = materialDesignIconNames.map((iconName) =>
  materialDesignIconFactory({ name: iconName, variant: 'round' }, `material-round-${iconName}`),
);
const sharp = materialDesignIconNames.map((iconName) =>
  materialDesignIconFactory({ name: iconName, variant: 'sharp' }, `material-sharp-${iconName}`),
);
const twoTone = materialDesignIconNames.map((iconName) =>
  materialDesignIconFactory({ name: iconName, variant: 'two-tone' }, `material-twoTone-${iconName}`),
);

const materialDesignVariantsCard = cardFactory({
  title: 'Material Design all variants',
  fullHeight: true,
  bodyChildren: [
    accordionFactory({
      items: [
        accordionItemFactory(
          {
            title: 'filled',
            componentChildren: filled,
          },
          'material-design-variants-card-filled',
        ),
        accordionItemFactory(
          {
            title: 'outlined',
            componentChildren: outlined,
          },
          'material-design-variants-card-outlined',
        ),
        accordionItemFactory(
          {
            title: 'round',
            componentChildren: round,
          },
          'material-design-variants-card-round',
        ),
        accordionItemFactory(
          {
            title: 'sharp',
            componentChildren: sharp,
          },
          'material-design-variants-card-sharp',
        ),
        accordionItemFactory(
          {
            title: 'twoTone',
            componentChildren: twoTone,
          },
          'material-design-variants-card-twoTone',
        ),
      ],
    }),
  ],
});

// FONTAWESOME-VARIANTS
const fontAwesomeVariantIcons = [];
fontAwesomeVariantIcons.push(textFieldFactory({}));

const fontAwesomeIconNames = [
  'address-book',
  'bell',
  'calendar',
  'download',
  'envelope',
  'file',
  'globe',
  'hand',
  'inbox',
  'key',
  'lock',
  'magnifying-glass',
  'notes-medical',
  'phone',
  'circle-question',
  'recycle',
  'spell-check',
  'trash',
  'umbrella',
  'user',
  'video',
  'wrench',
  'x-ray',
  'yen-sign',
  'z',
];

const brandIconsNames = [
  'apple',
  'bootstrap',
  'chrome',
  'dropbox',
  'ebay',
  'facebook',
  'google',
  'hacker-news',
  'instagram',
  'java',
  // 'kakao', // don'Ät exist
  'linkedin',
  'microsoft',
  // 'netflix',
  'opera',
  'paypal',
  'quora',
  'reddit',
  'slack',
  'twitter',
  'uber',
  'vimeo',
  'whatsapp',
  'xbox',
  'yahoo',
  // 'zoom',
];

const brands = brandIconsNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'brands' }, `icc-brands-${iconName}`),
);
const duotone = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'duotone' }, `icc-duotone-${iconName}`),
);
const light = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'light' }, `icc-light-${iconName}`),
);
const regular = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'regular' }, `icc-regular-${iconName}`),
);
const sharpDuotone = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'sharp-duotone' }, `icc-sharpDuotone-${iconName}`),
);
const sharpLight = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'sharp-light' }, `icc-sharpLight-${iconName}`),
);
const sharpRegular = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'sharp-regular' }, `icc-sharpRegular-${iconName}`),
);
const sharpSolid = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'sharp-solid' }, `icc-sharpSolid-${iconName}`),
);
const sharpThin = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'sharp-thin' }, `icc-sharpThin-${iconName}`),
);
const solid = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'solid' }, `icc-solid-${iconName}`),
);
const thin = fontAwesomeIconNames.map((iconName) =>
  fontAwesomeIconFactory({ name: iconName, variant: 'thin' }, `icc-thin-${iconName}`),
);

const fontAwesomeVariantsCard = cardFactory(
  {
    title: 'FontAwesome all variants',
    fullHeight: true,
    bodyChildren: [
      accordionFactory(
        {
          expandedItemSfIds: ['a-sharpDuotone'],
          items: [
            accordionItemFactory(
              {
                title: 'brands',
                componentChildren: brands,
              },
              'a-brands',
            ),
            accordionItemFactory(
              {
                title: 'duotone',
                componentChildren: duotone,
              },
              'a-duotone',
            ),
            accordionItemFactory(
              {
                title: 'light',
                componentChildren: light,
              },
              'a-light',
            ),
            accordionItemFactory(
              {
                title: 'regular',
                componentChildren: regular,
              },
              'a-regular',
            ),
            accordionItemFactory(
              {
                title: 'sharpDuotone',
                componentChildren: sharpDuotone,
              },
              'a-sharpDuotone',
            ),
            accordionItemFactory(
              {
                title: 'sharpLight',
                componentChildren: sharpLight,
              },
              'a-sharpLight',
            ),
            accordionItemFactory(
              {
                title: 'sharpRegular',
                componentChildren: sharpRegular,
              },
              'a-sharpRegular',
            ),
            accordionItemFactory(
              {
                title: 'sharpSolid',
                componentChildren: sharpSolid,
              },
              'a-sharpSolid',
            ),
            accordionItemFactory(
              {
                title: 'sharpThin',
                componentChildren: sharpThin,
              },
              'a-sharpThin',
            ),
            accordionItemFactory(
              {
                title: 'solid',
                componentChildren: solid,
              },
              'a-solid',
            ),
            accordionItemFactory(
              {
                title: 'thin',
                componentChildren: thin,
              },
              'a-thin',
            ),
          ],
        },
        'acc-jsdfksdjf',
      ),
    ],
  },
  'card-variants',
);

const streamlineIcons = [
  'square',
  'direction-right',
  'pin-right',
  'railroad-train-1',
  'calendar',
  'trip-distance',
  'task-checklist',
  'maps-pin-1',
  'checkbox-empty',
  'rating-star-1',
  'smiley-sad-1',
  'navigation-arrows-left-1',
  'social-instagram',
  'house-chimney-mobil',
  'lock-unlock',
  'products-briefcase',
  'add-circle',
  'travel-management',
  'pin-left',
  'picture-double-landscape',
  'check-1',
  'hierarchy-9',
  'star-full',
  'car',
  'movies-audience',
  'list-bullets-1',
  'personnel-administration',
  'tick',
  'messages-bubble-double',
  'arrow-up-navigation',
  'add',
  'alert-triangle',
  'wage-and-salary',
  'mobile-phone-1',
  'arrow-right-1',
  'hotel',
  'search',
  'social-xing',
  'social-facebook',
  'tags',
  'list-to-do',
  'arrow-button-up-1',
  'layout-column',
  'common-file-download',
  'folder-open',
  'controls-pause-full',
  'print-text',
  'hammer-wench',
  'analytics-bars',
  'direction-down',
  'hierarchy',
  'office-file-pdf',
  'navigation-arrows-right-1',
  'remove',
  'direction-up',
  'link-broken',
  'cake-birthday',
  'arrow-right',
  'social-linkedin',
  'smiley-indifferent',
  'house_homeoffice',
  'hierarchy-4',
  'accounting-calculator-1',
  'undo',
  'controls-play',
  'controls-play-full',
  'plane-board',
  'earth-1',
  'people-man-9',
  'attachment',
  'common-file-check-desktop',
  'note-mobil',
  'arrow-down-1',
  'floppy-disk',
  'time-management',
  'layout-headline',
  'filter-2',
  'bin-1',
  'arrow-left-1',
  'phone',
  'delete-2',
  'font-size',
  'developer-community-github-1',
  'info-2',
  'navigate-plus-thick',
  'common-file-double-2',
  'share-external-link-1',
  'dislike-1',
  'house-sun-desktop',
  'credit-card',
  'star',
  'subtract-square',
  'pencil-write-1',
  'cash-hand-mobil',
  'server-3',
  'fullscreen',
  'handshake-desktop',
  'smiley-smile-2',
  'view-crossed',
  'symbol-equal',
  'arrow-up',
  'woman-hair-open-desktop',
  'developer-community-stack-overflow',
  'cash-hand-desktop',
  'arrow-down',
  'time-clock-circle',
  'accounting-bill',
  'navigation-menu-vertical',
  'receipt-slip-1',
  'check-2',
  'download-bottom',
  'single-man',
  'share',
  'filter-sort-lines-descending',
  'controls-pause',
  'question-circle',
  'handshake-mobil',
  'settings-horizontal',
  'plane-1',
  'note-desktop',
  'workflow-project-management',
  'arrow-thick-left',
  'camera',
  'teamwork-hand-gather-desktop',
  'coding-apps-website-big-data-volume-folder',
  'navigate-down-thick',
  'navigate-minus-thick',
  'check-thick',
  'avatar-neutral-mobil',
  'redo',
  'arrow-left',
  'send-email-1',
  'email-action-unread',
  'arrow-up-1',
  'notes-desktop',
  'award-medal',
  'arrow-thick-right',
  'notes-mobil',
  'like-1',
  'customer-relationship-management-team-assignment',
  'notes-paper',
  'shopping-cart-add',
  'video-game-magic-wand',
  'human-resources-hierarchy',
  'building-1',
  'wage-salary',
  'view',
  'stopwatch',
  'multiple-man',
  'plus',
  'cross-thick',
  'arrow-down-navigation',
  'minus',
  'restaurant-fork-knife',
  'common-file-check-mobil',
  'book-library-2',
];

/**
 * @type { import('../../../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType }
 */
export const iconPage = smartFaceFactory({
  sfComponents: [
    pageFactory({
      componentChildren: [
        classicLayoutFactory({
          sidebar: sidebar('icon-page', ['component-pages']),
          content: {
            componentChildren: [
              uiHandlerFactory({
                iconSet: 'font-awesome-svg',
                componentChildren: [
                  gridFactory({
                    fullHeight: true,
                    items: [
                      gridItemFactory({
                        componentChildren: [materialDesignVariantsCard],
                      }),
                      gridItemFactory({
                        componentChildren: [fontAwesomeVariantsCard],
                      }),
                      gridItemFactory({
                        componentChildren: [
                          cardFactory(
                            {
                              title: 'Streamline',
                              bodyChildren: streamlineIcons.map((name) => streamlineIconFactory({ name })),
                            },
                            'card-0',
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
