import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tsEslint.config([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tsEslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /**
       * Enforce a convention in the order of import statements
       * @see https://github.com/lydell/eslint-plugin-simple-import-sort/tree/main
       */
      'simple-import-sort/imports': [
        'error',
        {
          /**
           * The default grouping, but with type imports first as a separate
           * group, sorting that group like non-type imports are grouped.
           * @see https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
           */
          groups: [
            ['^node:.*\\u0000$', '^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$', '^@/types'], // types
            ['^\\u0000'],
            ['^'], // side effect imports
            ['^@'], // alias
            ['^\\.'], // sibling
            ['^.+\\.css$'], // styles
          ],
        },
      ],

      /**
       * Disallow unused variables and arguments
       * except for those that start with an underscore...
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_|^e',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          // ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },
])
