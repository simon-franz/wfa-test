module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  settings: {
    react: {
      version: 'detect',
      pragma: 'automatic',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'unicorn', 'simple-import-sort', 'lodash', '@stylistic/ts'],
  rules: {
    'no-case-declarations': 'off',
    'no-extra-semi': 'off',
    '@stylistic/ts/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return'],
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': ['error', { 'prefer-inline': true }],

    'lodash/import-scope': 'error',

    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/switch-case-braces': 'off',
    'unicorn/consistent-function-scoping': 'off', // TODO maybe nice to have
    'unicorn/no-array-for-each': 'off', // TODO nice to have
    'unicorn/no-await-expression-member': 'off', // TODO evaluate
    'unicorn/no-nested-ternary': 'off', // TODO nice to have
    'unicorn/prefer-add-event-listener': 'off', // TODO nice to have
    'unicorn/prefer-dom-node-text-content': 'off', // TODO evaluate

    'react-refresh/only-export-components': 'off',

    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never', propElementValues: 'ignore' }],
    'react/jsx-no-target-blank': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // See https://github.com/emotion-js/emotion/blob/f3b268f7c52103979402da919c9c0dd3f9e0e189/docs/eslint-plugin-react.mdx
    'react/prop-types': 'off',

    '@typescript-eslint/consistent-type-imports': ['warn', { fixStyle: 'inline-type-imports' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' },
    ],

    /*
     * TODO update group order:
     *  - replace (@(adapter|type|ui|smartface-ui)) with (@hrworks)
     *  - remove (src) case
     *  - remove this TODO
     */
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          //(RegEx: path strings only)
          // 1.) Side effect imports. Begin with null character.
          ['^\\u0000'],
          // 2.) Third-party imports. Anything not matched in another group.
          ['^'],
          // 3.) Own imports: @adapter / @type / @ui
          ['(@(adapter|type|ui|smartface-ui)).+(?<!css)$'],
          // 4.) Own imports: src
          ['(src).+(?<!css)$'],
          // 5.) Own imports: .
          ['(\\.).+(?<!css)$'],
          // 6.) CSS imports. Anything that starts with a dot AND ends with css.
          ['\\..+(css)$'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*Page.js'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/src/adapters/**/*Adapter.tsx'],
      rules: {
        'react/no-children-prop': 'off',
      },
    },
    {
      files: ['**/**/*.types.ts', '**/**/*.styles.ts'],
    },
  ],
};
