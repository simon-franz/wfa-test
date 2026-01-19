// @ts-check

import { commentListPage } from './api-mocks/application/cd/commentListPage.js';
import { dashboardPage } from './api-mocks/application/hrworks-admin/dashboardPage.js';
import { hrAnalyticsPage } from './api-mocks/application/hrworks-admin/hrAnalyticsPage.js';
import { hrworksUserWhatsNewPage } from './api-mocks/application/hrworks-user/hrworksUserWhatsNewPage.js';
import { sqwLayoutPage } from './api-mocks/application/hrworks-user/sqwLayoutPage.js';
import { cmdTablePage } from './api-mocks/application/onboarding/cmdTablePage.js';
import { onboardingLoginPage } from './api-mocks/application/onboarding/onboardingLoginPage.js';
import { onboardingPage } from './api-mocks/application/onboarding/onboardingPage.js';
import { verticalNavigationPage } from './api-mocks/application/onboarding/verticalNavigationPage.js';
import { accordionPage } from './api-mocks/core/accordionPage.js';
import { afterEffectsMediaPage } from './api-mocks/core/afterEffectsMediaPage.js';
import { audioPage } from './api-mocks/core/audioPage.js';
import { backendTimerPage } from './api-mocks/core/backendTimerPage.js';
import { badgePage } from './api-mocks/core/badgePage.js';
import { buttonPage } from './api-mocks/core/buttonPage.js';
import { cardPage } from './api-mocks/core/cardPage.js';
import { checkboxGroupPage } from './api-mocks/core/checkboxGroupPage.js';
import { checkboxPage } from './api-mocks/core/checkboxPage.js';
import { collapsibleMenuPage } from './api-mocks/core/collapsibleMenuPage.js';
import { comboBoxPage } from './api-mocks/core/comboBoxPage.js';
import { copyToClipboardPage } from './api-mocks/core/copyToClipboardPage.js';
import { dateFieldPage } from './api-mocks/core/dateFieldPage.js';
import { defaultProviderPage } from './api-mocks/core/defaultValueProviderPage.js';
import { dropdownMenuPage } from './api-mocks/core/dropdownMenuPage.js';
import { errorHandlingPage } from './api-mocks/core/errorHandlingPage.js';
import { eventTest } from './api-mocks/core/eventTestPage.js';
import { exportEventPage } from './api-mocks/core/exportEventPage.js';
import { fileManagerPage } from './api-mocks/core/fileManagerPage.js';
import { formPage } from './api-mocks/core/formPage.js';
import { gridFullHeightPage } from './api-mocks/core/gridFullHeightPage.js';
import { gridPage } from './api-mocks/core/gridPage.js';
import { iconPage } from './api-mocks/core/iconPage.js';
import { iframeFullHeightPage } from './api-mocks/core/iframeFullHeightPage.js';
import { iframePage } from './api-mocks/core/iframePage.js';
import { imagePage } from './api-mocks/core/imagePage.js';
import { internalServerErrorPage } from './api-mocks/core/internalServerErrorPage.js';
import { keyDownSideEffectPage } from './api-mocks/core/keyDownSideEffectPage.js';
import { listPage } from './api-mocks/core/listPage.js';
import { loadingAnimationPage } from './api-mocks/core/loadingAnimationPage.js';
import { mobxPage } from './api-mocks/core/mobxPage.js';
import { modalsPage } from './api-mocks/core/modalsPage.js';
import { navigateToElementPage } from './api-mocks/core/navigateToElementPage.js';
import { networkErrorPage } from './api-mocks/core/networkErrorPage.js';
import { notificationPage } from './api-mocks/core/notificationPage.js';
import { pdfViewerFullHeightPage } from './api-mocks/core/pdfViewerFullHeightPage.js';
import { performanceTestPage } from './api-mocks/core/performanceTestPage.js';
import { progressPage } from './api-mocks/core/progressPage.js';
import { promptsPage } from './api-mocks/core/promptsPage.js';
import { radioGroupPage } from './api-mocks/core/radioGroupPage.js';
import { routingPage } from './api-mocks/core/routingPage.js';
import { sectionPage } from './api-mocks/core/sectionPage.js';
import { serverStatusPage } from './api-mocks/core/serverStatusPage.js';
import { sessionExpiredPage } from './api-mocks/core/sessionExpiredPage.js';
import { sidebarPage } from './api-mocks/core/sidebarPage.js';
import { sizeHandlerPage } from './api-mocks/core/sizeHandlerPage.js';
import { smartFaceBackendConfigPage } from './api-mocks/core/smartFaceBackendConfigPage.js';
import { svgIconPage } from './api-mocks/core/svgIconPage.js';
import { switchPage } from './api-mocks/core/switchPage.js';
import { tableFullHeightPage } from './api-mocks/core/tableFullHeightPage.js';
import { tablePage } from './api-mocks/core/tablePage.js';
import { tabsFullHeightPage } from './api-mocks/core/tabsFullHeightPage.js';
import { tabsPage } from './api-mocks/core/tabsPage.js';
import { textareaPage } from './api-mocks/core/textareaPage.js';
import { textPage } from './api-mocks/core/textPage.js';
import { timeFieldPage } from './api-mocks/core/timeFieldPage.js';
import { tooltipPage } from './api-mocks/core/tooltipPage.js';
import { treeGraphPage } from './api-mocks/core/treeGraphPage.js';
import { waypointPage } from './api-mocks/core/waypointPage.js';
import { cardFullHeightPage } from './api-mocks/extension/cardFullHeightPage.js';
import { carouselPage } from './api-mocks/extension/carouselPage.js';
import { chartFullHeightPage } from './api-mocks/extension/chartFullHeightPage.js';
import { chartsPage } from './api-mocks/extension/chartsPage.js';
import { dataGridFullHeightPage } from './api-mocks/extension/dataGridFullHeightPage.js';
import { dataGridPage } from './api-mocks/extension/dataGridPage.js';
import { fortuneWheelPage } from './api-mocks/extension/fortuneWheelPage.js';
import { imageCropperPage } from './api-mocks/extension/imageCropperPage.js';
import { nestedChecklistPage } from './api-mocks/extension/nestedChecklistPage.js';
import { overlayEffectPage } from './api-mocks/extension/overlayEffectPage.js';
import { panelGroupFullHeightPage } from './api-mocks/extension/panelGroupFullHeightPage.js';
import { panelGroupPage } from './api-mocks/extension/panelGroupPage.js';
import { panelGroupSinglePanelPage } from './api-mocks/extension/panelGroupSinglePanelPage.js';
import { pdfViewerPage } from './api-mocks/extension/pdfViewerPage.js';
import { portrayedListPage } from './api-mocks/extension/portrayedListPage.js';
import { uiHandlerFullHeightPage } from './api-mocks/extension/uiHandlerFullHeightPage.js';
import { userlanePage } from './api-mocks/extension/userlanePage.js';
import { workflowGraphPage } from './api-mocks/extension/workflowGraphPage.js';
/**
 * @type { Object.<string,import('../../src/types/shared/BackendResponseType/SmartFaceBackendDataType').SmartFaceBackendDataType> }
 */
const routes = {
  // Form Pages
  forms: formPage,
  checkbox: checkboxPage,
  checkboxGroup: checkboxGroupPage,
  dateFields: dateFieldPage,
  radioGroup: radioGroupPage,
  switch: switchPage,
  textarea: textareaPage,
  defaultProvider: defaultProviderPage,
  // HRworks Admin Pages
  hrAnalytics: hrAnalyticsPage,
  charts: chartsPage,
  chartFullHeight: chartFullHeightPage,
  dashboard: dashboardPage,
  nestedChecklist: nestedChecklistPage,
  // Onboarding Pages
  onboarding: onboardingPage,
  onboardingLogin: onboardingLoginPage,
  verticalNavigation: verticalNavigationPage,
  // Error & Network Pages
  smartFaceBackendConfig: smartFaceBackendConfigPage,
  internalServerError: internalServerErrorPage,
  sessionExpired: sessionExpiredPage,
  serverStatus: serverStatusPage,
  networkError: networkErrorPage,
  // Navigation Pages
  routing: routingPage,
  sidebar: sidebarPage,
  errorHandling: errorHandlingPage,
  navigateToElement: navigateToElementPage,
  // Notifications & Events Pages
  eventTest: eventTest,
  keyDown: keyDownSideEffectPage,
  notifications: notificationPage,
  backendTimer: backendTimerPage,
  // Dialogs & Prompts
  modals: modalsPage,
  prompts: promptsPage,
  // MISC Pages
  afterEffectsMedia: afterEffectsMediaPage,
  audio: audioPage,
  svgIcon: svgIconPage,
  exportEvent: exportEventPage,
  copyToClipboard: copyToClipboardPage,
  accordion: accordionPage,
  loadingAnimation: loadingAnimationPage,
  waypoint: waypointPage,
  list: listPage,
  panelGroup: panelGroupPage,
  panelGroupFullHeight: panelGroupFullHeightPage,
  panelGroupSinglePanel: panelGroupSinglePanelPage,
  badge: badgePage,
  image: imagePage,
  buttons: buttonPage,
  card: cardPage,
  cardFullHeight: cardFullHeightPage,
  comboBox: comboBoxPage,
  commentList: commentListPage,
  dropdownMenu: dropdownMenuPage,
  fileManager: fileManagerPage,
  icon: iconPage,
  iframe: iframePage,
  iframeFullHeight: iframeFullHeightPage,
  imageCropper: imageCropperPage,
  pdfViewer: pdfViewerPage,
  pdfViewerFullHeight: pdfViewerFullHeightPage,
  progress: progressPage,
  portrayedList: portrayedListPage,
  sizeHandler: sizeHandlerPage,
  tabs: tabsPage,
  tabsFullHeight: tabsFullHeightPage,
  table: tablePage,
  tableFullHeight: tableFullHeightPage,
  timeField: timeFieldPage,
  cmdTable: cmdTablePage,
  treeGraph: treeGraphPage,
  collapsibleMenu: collapsibleMenuPage,
  workflowGraph: workflowGraphPage,
  dataGrid: dataGridPage,
  dataGridFullHeight: dataGridFullHeightPage,
  section: sectionPage,
  text: textPage,
  tooltip: tooltipPage,
  uiHandlerFullHeight: uiHandlerFullHeightPage,
  mobx: mobxPage,
  gridFullHeight: gridFullHeightPage,
  grid: gridPage,
  userlane: userlanePage,
  overlayEffect: overlayEffectPage,
  sqwLayout: sqwLayoutPage,
  whatsNew: hrworksUserWhatsNewPage,
  fortuneWheel: fortuneWheelPage,
  carousel: carouselPage,
  performanceTest: performanceTestPage,
};

/** @type {import('express').Handler}  */
export async function router(req, res) {
  const { route } = req.params;
  res.send(routes[route] || buttonPage);
}
