import registerReportPortalPlugin from '@reportportal/agent-js-cypress/lib/plugin';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import { defineConfig } from 'cypress';
import { afterRunHook, beforeRunHook } from 'cypress-mochawesome-reporter/lib';
import cypressMochawesomeReporterPlugin from 'cypress-mochawesome-reporter/plugin';

import {
  generateMochawesomeReporterOptions,
  generateReportPortalOptions,
  getBrowserConfiguration,
  getComponentList,
  getComponentPaths,
  getComponentPathsFiltered,
  getEnabledReporters,
  isRunningLocally,
  loadEnvironmentConfig,
  logComponentListPaths,
  logTestExecutionDetails,
  logTestRunEnd,
  logTestRunStart,
  openLatestMochaReport,
} from './src/helpers/index';

// --------------------------------------------------------------
// ENVIRONMENT
// --------------------------------------------------------------
loadEnvironmentConfig();

const PACKAGE_DIRECTORIES = [
  'sui-core/src/',
  'sui-extension/src/',
  'sui-shared/src/components/',
  'error-handling/src/components/',
];

// --------------------------------------------------------------
// SPEC FILES
// --------------------------------------------------------------
// Cypress expects an Array of Paths to the Testfiles provided via
// specPattern property in the defineConfig()-Options. When executing
// cycli or cygui, we filter the components with the following Specificity Order:
// 1. List from TEST_COMPONENTS environment variable
// 2. List from test-components.mjs
// 3. All Components if both Lists empty / undefined
const { componentList, source } = getComponentList();
const componentListPaths = getComponentPaths(PACKAGE_DIRECTORIES);
logComponentListPaths(componentListPaths, componentList, source);
const specPattern = getComponentPathsFiltered(componentListPaths, componentList);

// --------------------------------------------------------------
// REPORTER
// --------------------------------------------------------------
const reportPortalOptions = generateReportPortalOptions();
const mochawesomeReporterOptions = generateMochawesomeReporterOptions();
const enabledReporters = getEnabledReporters();

// --------------------------------------------------------------
// CYPRESS CONFIG
// --------------------------------------------------------------

const retries = 5;
export default defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: enabledReporters,
    reportportalAgentJsCypressReporterOptions: reportPortalOptions,
    cypressMochawesomeReporterReporterOptions: mochawesomeReporterOptions,
  },
  retries: {
    runMode: retries,
    openMode: retries,
  },
  video: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    supportFile: './src/support/component.ts',
    indexHtmlFile: './src/support/componentIndex.html',
    fixturesFolder: false,
    downloadsFolder: './outputs/downloads',
    screenshotsFolder: './outputs/cyErrors',
    viewportWidth: 500,
    viewportHeight: 500,

    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // PLUGINS
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      registerReportPortalPlugin(on, config);
      addMatchImageSnapshotPlugin(on);
      cypressMochawesomeReporterPlugin(on);

      on('task', {
        log(message) {
          console.log('🔍 DEBUG:', message);

          return null;
        },
      });

      // BROWSER CONFIG
      on('before:browser:launch', (browser, launchOptions) => {
        return getBrowserConfiguration(browser, launchOptions);
      });

      // MOCHA REPORTER & LOGGING
      const testStartTime = new Date();

      const { project, launch, endpoint, apiKey } = reportPortalOptions;

      logTestExecutionDetails({
        project,
        launch,
        endpoint,
        apiKey,
        startTime: testStartTime,
      });

      on('before:run', async (details) => {
        const beforeRunTime = new Date();
        logTestRunStart(beforeRunTime);

        // MochaHooks: https://github.com/LironEr/cypress-mochawesome-reporter
        await beforeRunHook(details);
      });

      on('after:run', async (results) => {
        const afterRunTime = new Date();

        const rpOptions = {
          project,
          launch,
          endpoint,
          apiKey,
        };

        logTestRunEnd({ testStartTime, afterRunTime, results, rpOptions });
        await afterRunHook();

        // OPEN MOCHA HTML REPORT
        if (isRunningLocally()) {
          openLatestMochaReport();
        }

        return new Promise((resolve) => setTimeout(resolve, 5000));
      });

      config.env.RP_SPEC = specPattern;

      const launchUuid = process.env.REPORT_PORTAL_LAUNCH_UUID;
      if (launchUuid) {
        console.log(`🔗 CYPRESS CONFIG: Setting launchId: ${launchUuid}`);

        const currentRpOptions = config.reporterOptions?.reportportalAgentJsCypressReporterOptions || {};

        config.reporterOptions = {
          ...config.reporterOptions,
          reportportalAgentJsCypressReporterOptions: {
            ...currentRpOptions,
            launchId: launchUuid,
          },
        };

        console.log(
          `CYPRESS CONFIG: Final RP Options:`,
          JSON.stringify(config.reporterOptions.reportportalAgentJsCypressReporterOptions, null, 2),
        );
      } else {
        console.log(`CYPRESS CONFIG: No Launch UUID provided`);
      }

      return config;
    },
    specPattern,
  },
});
