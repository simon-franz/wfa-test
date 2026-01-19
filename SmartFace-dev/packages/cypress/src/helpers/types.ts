type CypressTestStats = {
  passes?: number;
  failures?: number;
  tests?: number;
  pending?: number;
  skipped?: number;
};

type CypressTestRun = {
  stats?: CypressTestStats;
  spec?: {
    name?: string;
    relative?: string;
  };
};

type CypressRunResult = {
  runs?: CypressTestRun[];
  totalDuration?: number;
  totalSuites?: number;
  totalTests?: number;
  totalFailed?: number;
  totalPassed?: number;
  totalPending?: number;
  totalSkipped?: number;
  startedTestsAt?: string;
  endedTestsAt?: string;
};

type CypressFailedRunResult = {
  status: 'failed';
  failures?: number;
  message?: string;
};

type CypressTestResults = CypressRunResult | CypressFailedRunResult;

type PackageTestFile = {
  file: string;
  isIncluded: boolean;
};

export type PackageTestGroups = Record<string, PackageTestFile[]>;

// Component List types
export type ComponentListResult = {
  componentList: string[] | undefined;
  source: 'single-spec' | 'env' | 'config' | 'fallback' | null;
};

export type ComponentListSource = 'env' | 'config' | 'fallback' | 'single-spec' | null;

// Reporter Configuration types
export type ReportPortalOptions = {
  apiKey: string;
  endpoint: string;
  project: string;
  launch: string;
  description: string;
  autoMerge?: boolean;
  parallel?: boolean;
  attributes: { key: string; value: string }[];
  logging: { level: string };
  reportSpecsInSingleFile: boolean;
  screenshotsFolder: string;
  launchId?: string;
  launchUuidPrint?: boolean;
  launchUuidPrintOutput?: string;
};

export type MochawesomeReporterOptions = {
  charts: boolean;
  reportPageTitle: string;
  embeddedScreenshots: boolean;
  inlineAssets: boolean;
  saveAllAttempts: boolean;
  reportDir: string;
  reportFilename: string;
  html: boolean;
  saveJson: boolean;
  overwrite: boolean;
  quiet: boolean;
};

// Logging types
export type TestExecutionDetails = {
  project?: string;
  launch?: string;
  endpoint?: string;
  apiKey?: string;
  startTime?: Date;
};

export type TestRunEndParams = {
  testStartTime: Date;
  afterRunTime: Date;
  results: CypressTestResults;
  rpOptions: {
    project: string;
    launch: string;
    endpoint: string;
    apiKey: string;
    finishTime?: string;
  };
};

export type LogColors = Record<string, string>;

export type LogSectionOptions = {
  dividerChar?: string;
  dividerLength?: number;
  emoji?: string;
  color?: keyof LogColors;
  bgColor?: keyof LogColors;
};

export type PackageGroupsLogResult = {
  packageDetails: string[];
  totalIncluded: number;
  totalExcluded: number;
};
