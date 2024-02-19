/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const eslint = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const stylisticTs = require('@stylistic/eslint-plugin-ts');

module.exports = tsEslint.config({
  files: ['src/**/*.ts', 'eslint.config.js'],

  ignores: ['build/**', 'node_modules/**'],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
  plugins: {
    '@typescript-eslint': tsEslint.plugin,
    '@stylistic/ts': stylisticTs,
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
        varsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@stylistic/ts/quotes': ['error', 'single'],
  },
});
