import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sonarjs from 'eslint-plugin-sonarjs'
import storybook from 'eslint-plugin-storybook'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const ignoreConfig = {
  ignores: [
    '**/.husky/**',
    '**/.scripts/**',
    '**/.vscode/**',
    '**/node_modules/**',
    '**/public/**',
    '**/build/**',
    '**/storybook-static/**',
    '**/coverage/**'
  ]
}

const mainConfig = {
  plugins: {
    react,
    '@typescript-eslint': typescriptEslint,
    'simple-import-sort': simpleImportSort,
    'react-refresh': reactRefresh,
    'react-hooks': reactHooks,
    'unused-imports': unusedImports,
    sonarjs,
    'jsx-a11y': jsxA11y,
    unicorn,
    prettier
  },
  languageOptions: {
    globals: { ...globals.browser },
    parser: tsParser,
    ecmaVersion: 12,
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: { jsx: true },
      sourceType: 'module'
    }
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    curly: ['error', 'multi-line'],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: '@context/index', message: 'Import specific modules, not the index.' },
          { name: '@atoms/index', message: 'Import specific modules, not the index.' },
          { name: '@molecules/index', message: 'Import specific modules, not the index.' },
          { name: '@components/index', message: 'Import specific modules, not the index.' },
          { name: '@layouts/index', message: 'Import specific modules, not the index.' },
          { name: '@hooks/index', message: 'Import specific modules, not the index.' },
          { name: '@crud/index', message: 'Import specific modules, not the index.' },
          { name: '@utils/index', message: 'Import specific modules, not the index.' },
          { name: '@global/index', message: 'Import specific modules, not the index.' },
          { name: '@styles/index', message: 'Import specific modules, not the index.' },
          { name: '@images/index', message: 'Import specific modules, not the index.' },
          { name: '@routes/index', message: 'Import specific modules, not the index.' },
          { name: '@pages/index', message: 'Import specific modules, not the index.' }
        ]
      }
    ],
    'unused-imports/no-unused-imports': 'error',
    'react/display-name': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-array-index-key': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'sonarjs/no-duplicate-string': 'error',
    'sonarjs/cognitive-complexity': ['error', 15],
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/prefer-read-only-props': 'error',
    'sonarjs/redundant-type-aliases': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-query-selector': 'error',
    'prettier/prettier': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            String.raw`^\u0000`,
            '^react',
            '^react-dom',
            String.raw`^@?\w`,
            '^@context',
            '^@hooks',
            '^@routes',
            '^@crud',
            '^@utils',
            '^@components',
            '^@atoms',
            '^@molecules',
            '^@layouts',
            '^@global',
            String.raw`^\.\..(?!/?$)`,
            String.raw`^\.\./?.`,
            String.raw`^\./(?=.*/)(?!/?$)`,
            String.raw`^\.(?!/?$)`,
            String.raw`^\./?.`,
            String.raw`^.+\.(svg|png|jpe?g|gif|webp|avif|ico|bmp|tiff?)$`,
            String.raw`.*\u0000$`,
            String.raw`^.+\.types$`,
            '^clsx',
            String.raw`^.*\.module\.scss$`,
            String.raw`^.+\.css$`
          ]
        ]
      }
    ]
  }
}

export default [
  ignoreConfig,
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  mainConfig,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'storybook/no-renderer-packages': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.mock.ts'],
    rules: {
      'sonarjs/no-duplicate-string': 'off'
    }
  }
]
