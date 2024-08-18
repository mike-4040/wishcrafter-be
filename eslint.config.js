import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';

export default tsEslint.config({
  files: ['src/**/*.ts', 'eslint.config.js'],
  ignores: ['build/**', 'node_modules/**'],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      projectService: {
        allowDefaultProject: ['*.js'],
      },
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
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/line-comment-position': ['error', { position: 'above' }],
    '@stylistic/multiline-comment-style': ['error', 'starred-block'],
    '@stylistic/quotes': ['error', 'single'],
    'no-duplicate-imports': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
        allowSeparatedGroups: true,
      },
    ],
  },
});
