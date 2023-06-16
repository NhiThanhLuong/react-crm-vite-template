module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  ignorePatterns: ['./tsconfig.json'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // "plugin:import/warnings"
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 0,
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'prettier/prettier': ['off', { singleQuote: true }],
    'no-restricted-imports': [
      2,
      {
        patterns: [
          '@/features/*/*',
          '@/components/*',
          '@/hooks/*',
          '@/utils/*',
          '@/ts/*/*',
        ],
      },
    ],

    //@typescript-eslint/recommended-requiring-type-checking
    // '@typescript-eslint/await-thenable': 'error',
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/no-for-in-array': 'error',
    'no-implied-eval': 'off',
    // '@typescript-eslint/no-implied-eval': 'error',
    // '@typescript-eslint/no-misused-promises': 'error',
    // '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    // '@typescript-eslint/no-unsafe-argument': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'error',
    // '@typescript-eslint/no-unsafe-call': 'error',
    // '@typescript-eslint/no-unsafe-member-access': 'error',
    // '@typescript-eslint/no-unsafe-return': 'error',
    'require-await': 'off',
    // '@typescript-eslint/require-await': 'error',
    // '@typescript-eslint/restrict-plus-operands': 'error',
    // '@typescript-eslint/restrict-template-expressions': 'error',
    // '@typescript-eslint/unbound-method': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './.eslintrc.cjs'],
    tsconfigRootDir: __dirname,
  },
};
