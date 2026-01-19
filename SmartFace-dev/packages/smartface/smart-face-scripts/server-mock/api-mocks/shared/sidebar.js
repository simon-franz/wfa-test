// @ts-check
import {
  collapsibleMenuFactory,
  entryFactory,
} from '../../../../shared/smartFaceComponentFactories/core/collapsibleMenuFactory.js';
import { fontAwesomeIconFactory } from '../../../../shared/smartFaceComponentFactories/core/fontAwesomeIconFactory.js';

/**
 * @typedef { Object } Route
 * @property { string } text
 * @property { string } [href]
 * @property { Array<Route> } [submenu]
 * @property { string } id
 * @property { any } [icon]
 */

/**
 * @type { Array<Route> }
 */

const routes = [
  {
    text: 'Component Pages',
    href: '/button',
    id: 'component-pages',
    icon: fontAwesomeIconFactory({ name: 'cubes' }),
    submenu: [
      { text: 'After Effects Media Page', href: '/afterEffectsMedia', id: 'after-effects-media-page' },
      { text: 'Accordion Page', href: '/accordion', id: 'accordion-page' },
      { text: 'Badge Page', href: '/badge', id: 'badge-page' },
      { text: 'Button Page', href: '/button', id: 'button-page' },
      {
        text: 'Card Pages',
        id: 'card-pages',
        submenu: [
          { text: 'Card Page', href: '/card', id: 'card-page' },
          { text: 'Card fullHeight Page', href: '/cardFullHeight', id: 'card-full-height-page' },
        ],
      },
      {
        text: 'Charts Pages',
        id: 'charts-pages',
        submenu: [
          { text: 'Charts Page', href: '/charts', id: 'charts-page' },
          { text: 'Chart fullHeight Page', href: '/chartFullHeight', id: 'chart-full-height-page' },
        ],
      },
      {
        text: 'Data Grid Pages',
        id: 'data-grid-pages',
        submenu: [
          {
            text: 'Data Grid fullHeight Page',
            href: '/dataGridFullHeight',
            id: 'data-grid-full-height-page',
          },
          {
            text: 'Data Grid Page',
            href: '/dataGrid',
            id: 'data-grid-page',
          },
        ],
      },
      { text: 'DropdownMenu Page', href: '/dropdownMenu', id: 'dropdownMenu-page' },
      { text: 'Icon Page', href: '/icon', id: 'icon-page' },
      {
        text: 'Grid Pages',
        id: 'grid-pages',
        submenu: [
          {
            text: 'Grid fullHeight Page',
            href: '/gridFullHeight',
            id: 'grid-full-height-page',
          },
          {
            text: 'Grid Page',
            href: '/grid',
            id: 'grid-page',
          },
        ],
      },
      {
        text: 'PanelGroup Pages',
        id: 'panel-group-pages',
        submenu: [
          {
            text: 'PanelGroup Page',
            href: '/panelGroup',
            id: 'panel-group-page',
          },
          {
            text: 'PanelGroup fullHeight Page',
            id: 'panel-group-full-height-page',
            href: '/panelGroupFullHeight',
          },
        ],
      },
      {
        text: 'IFrame Pages',
        id: 'iframe-pages',
        submenu: [
          { text: 'IFrame Page', href: '/iframe', id: 'iframe-page' },
          { text: 'IFrame fullHeight Page', href: '/iframeFullHeight', id: 'iframe-full-height-page' },
        ],
      },
      { text: 'Image Page', href: '/image', id: 'image-page' },
      { text: 'ImageCropper Page', href: '/imageCropper', id: 'image-cropper-page' },
      { text: 'LoadingAnimation Page', href: '/loadingAnimation', id: 'loading-animation-page' },
      { text: 'PortrayedList Page', href: '/portrayedList', id: 'portrayed-list-page' },
      { text: 'PdfViewer Page', href: '/pdfViewer', id: 'pdfviewer-page' },
      { text: 'Section Page', href: '/section', id: 'section-page' },
      { text: 'Sidebar Page', href: '/sidebar', id: 'sidebar-page' },
      { text: 'Size Handler Page', href: '/sizeHandler', id: 'sizehandler-page' },
      {
        text: 'Tab Pages',
        id: 'tabs-pages',
        submenu: [
          {
            text: 'Tab fullHeight Page',
            href: '/tabsFullHeight',
            id: 'tab-full-height-page',
          },
          {
            text: 'Tab Page',
            href: '/tabs',
            id: 'tabs-page',
          },
        ],
      },
      { text: 'Table Page', href: '/table', id: 'table-page' },
      { text: 'Text Page', href: '/text', id: 'text-page' },
      { text: 'Tooltip Page', href: '/tooltip', id: 'tooltip-page' },
      { text: 'UI-Handler fullHeight Page', href: '/uiHandlerFullHeight', id: 'ui-handler-full-height-page' },
      { text: 'Waypoint Page', href: '/waypoint', id: 'waypoint-page' },
    ],
  },
  {
    text: 'Form Pages',
    id: 'form-pages',
    submenu: [
      { text: 'Form Page', href: '/forms', id: 'form-page' },
      { text: 'Checkbox Page', href: '/checkbox', id: 'checkbox-page' },
      { text: 'CheckboxGroup Page', href: '/checkboxGroup', id: 'checkbox-group-page' },
      { text: 'RadioGroup Page', href: '/radioGroup', id: 'radio-group-page' },
      { text: 'Switch Page', href: '/switch', id: 'switch-page' },
      { text: 'ComboBox Page', href: '/comboBox', id: 'combo-box-page' },
      { text: 'Datefields Page', href: '/dateFields', id: 'date-fields-page' },
      { text: 'Textarea Page', href: '/textarea', id: 'textarea-page' },
      { text: 'File Manager Page', href: '/fileManager', id: 'file-manager-page' },
    ],
  },
  {
    text: 'SideEffect Pages',
    id: 'side-effect-pages',
    submenu: [
      { text: 'Backend Timer Page', href: '/backendTimer', id: 'backend-timer-page' },
      { text: 'Internal Server Error Page', href: '/internalServerError', id: 'internal-server-error-page' },
      { text: 'Session Expired Page', href: '/sessionExpired', id: 'session-expired-page' },
      { text: 'Notification Page', href: '/notifications', id: 'notification-page' },
      { text: 'Routing Page', href: '/routing', id: 'routing-page' },
      { text: 'NavigateToElement Page', href: '/navigateToElement', id: 'navigate-to-element-page' },
      { text: 'KeyDown Page', href: '/keyDown', id: 'key-down-page' },
      { text: 'SmartFace Backend Config Page', href: '/smartFaceBackendConfig', id: 'smart-face-backend-config-page' },
    ],
  },
  {
    text: 'Dialogs & Prompts Pages',
    id: 'dialog-prompts-pages',
    submenu: [
      { text: 'Modals Page', href: '/modals', id: 'modals-page' },
      { text: 'Prompts Page', href: '/prompts', id: 'prompts-page' },
    ],
  },
  {
    text: 'Server & Error Pages',
    id: 'server-and-error-pages',
    submenu: [
      { text: 'Network Error Page', href: '/networkError', id: 'network-error-page' },
      { text: 'Server Status Page', href: '/serverStatus', id: 'server-status-page' },
    ],
  },
  { text: 'SfEvent Page', href: '/eventTest', id: 'event-test-page' },
  {
    text: 'Miscellaneous',
    id: 'miscellaneous',
    submenu: [
      { text: 'Audio', href: '/audio', id: 'audio-page' },
      { text: 'Performance Test', href: '/performanceTest', id: 'performance-test' },
    ],
  },
];

/**
 * @param { Array<Route> } routes
 * @returns { Array<import('../../../../../sui-core/src/CollapsibleMenu/CollapsibleMenu.types').ControlledCollapsibleMenuProps> }
 */
const mapRoutes = (routes) =>
  routes.map(({ text, href, id, submenu, icon }) =>
    entryFactory({ text, href, icon, componentParts: submenu && mapRoutes(submenu) }, id),
  );

/**
 * @param { string } [activeEntrySfId]
 * @param { Array<string> } [expandedEntrySfIds]
 * @returns { import('../../../../src/adapters/core/ClassicLayoutAdapter/ClassicLayoutAdapter.types').ClassicLayoutBackendDefinition['sidebar'] }
 */
export const sidebar = (activeEntrySfId, expandedEntrySfIds) => ({
  componentChildren: [
    collapsibleMenuFactory({
      activeEntrySfId,
      expandedEntrySfIds,
      multiple: true, // toggle to allowMultipleOpen
      showDepthIndicator: true,
      componentParts: mapRoutes(routes),
    }),
  ],
});
