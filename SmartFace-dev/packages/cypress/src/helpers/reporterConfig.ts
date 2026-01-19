import { getExecutionEnvironment, getReportPortalApiKey } from './environment.js';
import type { MochawesomeReporterOptions, ReportPortalOptions } from './types.js';

export const generateReportPortalOptions = (): ReportPortalOptions => {
  const execEnv = getExecutionEnvironment();
  const apiKey = getReportPortalApiKey();
  const launchUuid = process.env.REPORT_PORTAL_LAUNCH_UUID;

  const baseOptions = {
    apiKey,
    endpoint: 'https://test-dashboard.internal-hrworks.de/api/v1',
    project: `${execEnv === 'CI' ? 'hrworks' : 'frontend_test'}`,
    launch: `${execEnv}: SmartFace Component Tests`,
    description: `${execEnv}: SmartFace Visual Regession & Functional Tests`,
    attributes: [
      {
        key: 'source',
        value: execEnv,
      },
    ],
    logging: {
      level: 'warn',
    },
    reportSpecsInSingleFile: false,
    screenshotsFolder: './outputs/reportPortal',
    launchUuidPrint: true,
    launchUuidPrintOutput: 'STDOUT',
  };

  // CI with Launch UUID (Uses existing launch)
  if (execEnv === 'CI' && launchUuid) {
    console.log(`ReportPortal: Using existing Launch ID: ${launchUuid}`);

    return {
      ...baseOptions,
      launchId: launchUuid,
    };
  }
  console.log(`ReportPortal: Using default config (creating new launch)`);

  return baseOptions;
};

export const generateMochawesomeReporterOptions = (): MochawesomeReporterOptions => {
  const timestamp = new Date().toISOString().replaceAll(/[.:]/g, '-');

  return {
    charts: true,
    reportPageTitle: 'mochawesome: SmartFace Component Tests',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'outputs/reports',
    reportFilename: `mochawesome-report-${timestamp}`,
    html: true,
    saveJson: true,
    overwrite: true,
    quiet: true,
  };
};

export const getEnabledReporters = (): string => {
  const reportPortalPlugin = '@reportportal/agent-js-cypress';
  const mochawesomePlugin = 'cypress-mochawesome-reporter';

  return `${reportPortalPlugin}, ${mochawesomePlugin}`;
};
