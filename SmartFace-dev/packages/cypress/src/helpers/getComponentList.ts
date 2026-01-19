import * as fs from 'node:fs';
import * as path from 'node:path';

import type { ComponentListResult } from './types.js';

const toTitleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// --------------------------------------------------------------
// TEST_COMPONENTS
// --------------------------------------------------------------
const getComponentsFromEnvironment = (): string[] | null => {
  const envComponents = process.env.TEST_COMPONENTS;

  const envIsNotDefined = envComponents === undefined;
  const envIsEmpty = !envIsNotDefined && envComponents.trim() === '';
  if (envIsNotDefined || envIsEmpty) {
    return null;
  }

  return envComponents
    .split(',')
    .map((component) => component.trim())
    .filter(Boolean)
    .map((component) => toTitleCase(component));
};

// --------------------------------------------------------------
// test-components.mjs
// --------------------------------------------------------------
const getComponentsFromConfigFile = (): string[] => {
  try {
    const cypressRoot = process.cwd();
    const configPath = path.join(cypressRoot, 'test-components.mjs');
    const configContent = fs.readFileSync(configPath, 'utf8');

    // Get COMPONENT_GROUPS array & extract content
    const match = configContent.match(/export const COMPONENT_GROUPS = \[(.*?)];/s);

    if (!match) {
      throw new Error('Could not find COMPONENT_GROUPS array in test-components.mjs. No filtering applied.');
    }

    const arrayContent = match[1];
    // Parse the nested array structure & flatten it
    const components: string[] = [];
    const lines = arrayContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Remove empty lines, comments & array-brackets
      if (!trimmed || trimmed.startsWith('//') || trimmed === '[' || trimmed === '],' || trimmed === ']') {
        continue;
      }

      // Extract component names from strings
      const matches = trimmed.match(/'([^']+)'/g);
      if (matches) {
        const lineComponents = matches.map((match) => match.replaceAll("'", ''));
        components.push(...lineComponents);
      }
    }

    return components.map((component: string) => toTitleCase(component));
  } catch (error) {
    console.warn('Could not read test-components.mjs. No filtering applied.', error);

    return [];
  }
};

export const getComponentList = (): ComponentListResult => {
  // 1. Single spec mode check
  if (process.env.CYPRESS_SINGLE_SPEC_MODE === 'true') {
    return { componentList: undefined, source: 'single-spec' };
  }

  // 2. Environment components check
  const envComponents = getComponentsFromEnvironment();
  if (envComponents !== null) {
    return { componentList: envComponents, source: 'env' };
  }

  // 3. Config file components check
  const configComponents = getComponentsFromConfigFile();
  if (configComponents.length > 0) {
    return { componentList: configComponents, source: 'config' };
  }

  // 4. Fallback
  const envIsEmpty = process.env.TEST_COMPONENTS !== undefined && process.env.TEST_COMPONENTS.trim() === '';
  if (envIsEmpty) {
    return { componentList: configComponents, source: 'fallback' };
  }

  return { componentList: configComponents, source: null };
};
