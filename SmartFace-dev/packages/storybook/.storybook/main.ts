import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'node:path';
import { mergeConfig } from 'vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: [
    '../../sui-**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../smartface/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../error-handling/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-dark-mode'),
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: ['../../packages/**/**.tsx'],
      // Obviously we have to declare everything manually once we added options
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      savePropValueAsString: true,
      skipChildrenPropWithoutDoc: false,
      propFilter: (prop) => {
        return prop.parent ? !/node_modules/.test(prop.parent.fileName) : true;
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      build: {
        sourcemap: true,
      },
      server: {
        watch: {
          // DevContainer HMR fix - remove when higher Vite version resolves hmr bug.
          usePolling: true,
        },
      },
    });
  },
};

export default config;
