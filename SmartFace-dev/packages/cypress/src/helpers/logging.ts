import path from 'node:path';

import type {
  ComponentListSource,
  LogColors,
  LogSectionOptions,
  PackageGroupsLogResult,
  PackageTestGroups,
  TestExecutionDetails,
  TestRunEndParams,
} from './types.js';

// =============================================================================
// UNIFIED LOGGING HELPERS
// =============================================================================

// ANSI color codes
const colors: LogColors = {
  reset: '\u001B[0m',
  bright: '\u001B[1m',
  dim: '\u001B[2m',

  // Text colors
  red: '\u001B[31m',
  green: '\u001B[32m',
  yellow: '\u001B[33m',
  blue: '\u001B[34m',
  magenta: '\u001B[35m',
  cyan: '\u001B[36m',
  white: '\u001B[37m',
  black: '\u001B[30m',
  orange: '\u001B[38;5;208m',

  // Background colors
  bgBlue: '\u001B[44m',
  bgMagenta: '\u001B[45m',
  bgCyan: '\u001B[46m',
  bgWhite: '\u001B[47m',
  bgOrange: '\u001B[48;5;208m',
} as const;

const createLogSection = (title: string, content?: string, options: LogSectionOptions = {}): void => {
  const { dividerChar = '=', dividerLength = 50, emoji = '🧪', color = 'bright', bgColor } = options;

  const divider = dividerChar.repeat(dividerLength);
  const colorCode = colors[color] || '';
  const bgColorCode = bgColor ? colors[bgColor] : '';
  const resetCode = colors.reset;
  const titleText = `${emoji} ${title}`;
  const paddedTitle = titleText.padEnd(dividerLength, ' ');

  console.log('\n');
  console.log(`${colorCode}${bgColorCode}${divider}${resetCode}`);
  console.log(`${colorCode}${bgColorCode}${paddedTitle}${resetCode}`);
  console.log(`${colorCode}${bgColorCode}${divider}${resetCode}`);

  if (content) {
    console.log(content);
  }
};

const logDivider = (
  dividerChar = '=',
  dividerLength = 50,
  color: keyof LogColors = 'bright',
  bgColor?: keyof LogColors,
): void => {
  const divider = dividerChar.repeat(dividerLength);
  const colorCode = colors[color] || '';
  const bgColorCode = bgColor ? colors[bgColor] : '';
  const resetCode = colors.reset;

  console.log(`${colorCode}${bgColorCode}${divider}${resetCode}`);
};

const obfuscateAPIKey = (key: string): string => {
  return '***' + key.slice(Math.max(0, key.length - 6));
};

const formatDateTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const dateString = `${day}.${month}.${year}`;

  const timezoneOffset = date.getTimezoneOffset();
  const timezoneHours = Math.abs(Math.floor(timezoneOffset / 60))
    .toString()
    .padStart(2, '0');
  const timezoneMinutes = Math.abs(timezoneOffset % 60)
    .toString()
    .padStart(2, '0');
  const timezoneSign = timezoneOffset <= 0 ? '+' : '-';
  const timezoneString = `GMT${timezoneSign}${timezoneHours}:${timezoneMinutes}`;

  return `${timeString} - ${dateString} - ${timezoneString}`;
};

// =============================================================================
// FOUND CYPRESS TEST FILES
// =============================================================================

const buildPackageGroups = (componentListPaths: string[], componentList?: string[]): PackageTestGroups => {
  const packageGroups: PackageTestGroups = {};

  componentListPaths.forEach((componentPath) => {
    const match = componentPath.match(/packages\/([^/]+)/);
    const packageName = match ? match[1] : 'unknown';

    if (!packageGroups[packageName]) {
      packageGroups[packageName] = [];
    }

    const relativePath = componentPath.replace(/.*\/packages\/[^/]+\//, '');
    const pathParts = componentPath.split(path.sep);
    const fileName = pathParts.at(-1) || '';
    const componentNameFromFile = fileName.replace('.cy.tsx', '');

    const isIncluded = !componentList || componentList.length === 0 || componentList.includes(componentNameFromFile);

    packageGroups[packageName].push({ file: relativePath, isIncluded });
  });

  return packageGroups;
};

const generatePackageGroupsLog = (packageGroups: PackageTestGroups): PackageGroupsLogResult => {
  let totalIncluded = 0;
  let totalExcluded = 0;
  const packageDetails: string[] = [];
  packageDetails.push('\n');
  Object.entries(packageGroups)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([packageName, files]) => {
      const includedCount = files.filter((f) => f.isIncluded).length;
      const excludedCount = files.length - includedCount;

      totalIncluded += includedCount;
      totalExcluded += excludedCount;

      packageDetails.push(
        `📦 ${packageName} (${files.length} tests, ${colors.green}${includedCount} included${colors.reset}, ${colors.orange}${excludedCount} excluded${colors.reset}):`,
      );

      files
        .sort((a, b) => a.file.localeCompare(b.file))
        .forEach(({ file, isIncluded }) => {
          const color = isIncluded ? colors.green : colors.dim;
          const icon = isIncluded ? '✅' : '🔳';
          packageDetails.push(`   └─ ${color}${icon} ${file}${colors.reset}`);
        });

      packageDetails.push('\n');
    });

  return { packageDetails, totalIncluded, totalExcluded };
};

const logComponentFilteringInfo = (source?: ComponentListSource): void => {
  console.log(`${colors.dim}Tests are filtered for cycli & cygui with following Specificity Order:${colors.reset}`);
  console.log(`${colors.dim}1. .env.development.local (TEST_COMPONENTS)${colors.reset}`);
  console.log(`${colors.dim}2. test-components.mjs (TEST_COMPONENTS)${colors.reset}`);
  console.log(`${colors.dim}3. No filtering (Both TEST_COMPONENTS empty / undefined)${colors.reset}`);

  if (source) {
    switch (source) {
      case 'env':
        console.log('🚀 Filter: .env.development.local.');
        break;
      case 'config':
        console.log('🚀 Filter: test-components.mjs.');
        break;
      case 'fallback':
        console.log('🚀 Filter: No filtering => All Testcases');
        break;
      case 'single-spec':
        console.log(`${colors.yellow}🚀 Running single test.${colors.reset}`);
        break;
    }
  }
};

export const logComponentListPaths = (
  componentListPaths: string[],
  componentList?: string[],
  source?: ComponentListSource,
): void => {
  const packageGroups = buildPackageGroups(componentListPaths, componentList);

  createLogSection('FOUND CYPRESS TEST FILES', '', {
    bgColor: 'bgWhite',
    color: 'black',
    emoji: '🔍',
  });

  logComponentFilteringInfo(source);

  if (source !== 'single-spec') {
    const { packageDetails, totalIncluded, totalExcluded } = generatePackageGroupsLog(packageGroups);

    packageDetails.push(
      `${colors.cyan}📊 Summary:${colors.reset}`,
      `   ${colors.green}✅ Included: ${totalIncluded} tests${colors.reset}`,
      `   ${colors.orange}🔳 Excluded: ${totalExcluded} tests${colors.reset}`,
      `   📈 Total: ${componentListPaths.length} test files found`,
    );

    console.log(packageDetails.join('\n'));
  }
  console.log('\n');
};

// =============================================================================
// TEST EXECUTION DETAILS
// =============================================================================
export const logTestExecutionDetails = ({
  project,
  launch,
  endpoint,
  apiKey,
  startTime,
}: TestExecutionDetails): void => {
  const content = [
    ``,
    `${colors.cyan}Project:${colors.reset} ${project}`,
    `${colors.cyan}Launch:${colors.reset} ${launch}`,
    `${colors.cyan}Endpoint:${colors.reset} ${endpoint}`,
    `${colors.cyan}API Key:${colors.reset} ${apiKey ? obfuscateAPIKey(apiKey) : 'Not set'}`,
    '',
    `${colors.cyan}Report Portal Start Time:${colors.reset} ${startTime && formatDateTime(startTime)}`,
  ].join('\n');

  createLogSection('TEST EXECUTION DETAILS', content, {
    bgColor: 'bgBlue',
    color: 'bright',
  });

  console.log('\n');
};

// =============================================================================
// TEST RUN STARTED
// =============================================================================
export const logTestRunStart = (startTime: Date): void => {
  const content = `\n${colors.magenta}Start Time:${colors.reset} ${formatDateTime(startTime)}`;

  createLogSection('TEST RUN STARTED', content, {
    bgColor: 'bgMagenta',
    color: 'bright',
    emoji: '🏁',
  });
};

export const logTestRunEnd = ({ testStartTime, afterRunTime, results, rpOptions }: TestRunEndParams): void => {
  const durationMs = afterRunTime.getTime() - testStartTime.getTime();

  console.log('\n');

  if (results && typeof results === 'object' && 'runs' in results && Array.isArray(results.runs)) {
    const totalSpecs = results.runs.length;
    const totalPassed = results.runs.reduce((sum: number, run) => sum + (run?.stats?.passes || 0), 0);
    const totalFailed = results.runs.reduce((sum: number, run) => sum + (run?.stats?.failures || 0), 0);
    const totalTests = results.runs.reduce((sum: number, run) => sum + (run?.stats?.tests || 0), 0);

    console.log(`${colors.blue}• Specs:${colors.reset} ${totalSpecs}`);
    console.log(`${colors.blue}• Tests:${colors.reset} ${totalTests}`);
    console.log(`${colors.green}• Passed:${colors.reset} ${totalPassed}`);
    console.log(`${colors.red}• Failed:${colors.reset} ${totalFailed}`);
  } else if (results && typeof results === 'object' && 'status' in results) {
    console.log(`${colors.red}• Status:${colors.reset} ${results.status}`);
    if ('failures' in results && typeof results.failures === 'number') {
      console.log(`${colors.red}• Failures:${colors.reset} ${results.failures}`);
    }
    if ('message' in results && typeof results.message === 'string') {
      console.log(`${colors.red}• Message:${colors.reset} ${results.message}`);
    }
  } else {
    console.log(`${colors.red}• Status:${colors.reset} Run completed`);
    if (results) {
      console.log(`${colors.dim}• Result type:${colors.reset} ${typeof results}`);
    }
  }

  if (rpOptions) {
    rpOptions.finishTime = afterRunTime.toISOString();
  }

  console.log(`${colors.yellow}• Duration:${colors.reset} ${(durationMs / 1000).toFixed(2)} seconds`);
  console.log('\n');
  console.log(`${colors.magenta}End Time:${colors.reset} ${formatDateTime(afterRunTime)}`);

  logDivider('=', 50, 'bright', 'bgMagenta');
  console.log('\n');
};
