import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    optimizeDeps: {
      exclude: ['@emotion/styled/base'],
    },
    plugins: [
      checker({
        typescript: true,
      }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
          plugins: [
            [
              '@emotion/babel-plugin',
              {
                autoLabel: 'always',
                labelFormat: '[local]-in-[filename]',
              },
            ],
            ['babel-plugin-react-compiler'],
          ],
        },
      }),
      tsConfigPaths(),
    ],
    server: {
      open: true,
      port: 3000,
      watch: {
        ignored: ['**/tsconfig.json'],
      },
    },
  };
});
