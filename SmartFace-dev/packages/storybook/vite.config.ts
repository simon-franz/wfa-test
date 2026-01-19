import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      legacy({
        targets: ['> 0.2%', 'last 2 versions', 'not dead', 'not IE 11'],
        modernPolyfills: ['es.array.at', 'es.string.replace-all'],
      }),
      checker({
        enableBuild: false,
        typescript: true,
      }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
          plugins: [
            ['@emotion/babel-plugin', { autoLabel: 'always', labelFormat: '[local]-in-[filename]' }],
            ['babel-plugin-react-compiler'],
          ],
        },
      }),
      tsConfigPaths(),
    ],
    server: {
      open: true,
      host: false, // (set to true to access via remote devices)
      watch: {
        ignored: ['**/tsconfig.json'],
      },
    },
  };
});
