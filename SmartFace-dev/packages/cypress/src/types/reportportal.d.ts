declare module '@reportportal/agent-js-cypress/lib/plugin' {
  function registerReportPortalPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): void;
  export default registerReportPortalPlugin;
}
