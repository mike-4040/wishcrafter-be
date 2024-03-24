/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const eslint = require('@eslint/js');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const tsEslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = tsEslint.config({
  files: ['src/**/*.ts', 'eslint.config.js'],

  ignores: ['build/**', 'node_modules/**'],
  extends: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    eslintPluginPrettierRecommended,
  ],
  plugins: {
    '@typescript-eslint': tsEslint.plugin,
    '@stylistic': stylistic,
  },
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      project: true,
    },
  },
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/eol-last': ['error', 'always'],
    'no-duplicate-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
        allowSeparatedGroups: true,
      },
    ],
  },
});
