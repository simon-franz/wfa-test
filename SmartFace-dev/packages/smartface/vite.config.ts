import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      //target: 'es2022', // TODO: May be needed later. If not, remove it.
      outDir: './build',
      sourcemap: true,
    },
    plugins: [
      legacy({
        targets: ['> 0.2%', 'last 2 versions', 'not dead', 'not IE 11'],
        modernPolyfills: ['es.array.at', 'es.string.replace-all'],
      }),
      checker({
        enableBuild: false,
        // Workaround: vite will hang forever after finishing build due to typescript checker.
        // Disable typescript checker if environment isn't in development mode.
        typescript: process.env.NODE_ENV === 'development',
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
      host: false, // (set to true to access via remote devices)
      port: env.VITE_PORT ? Number.parseInt(env.VITE_PORT, 10) : 3000,
      watch: {
        ignored: ['**/tsconfig.json', '**/smart-face-scripts/**'],
        // DevContainer HMR fix - remove when higher Vite version resolves hmr bug.
        usePolling: true,
      },
    },
  };
});
