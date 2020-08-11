module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  rules: {
    strict: 'error',
    'one-var': ['error', 'never'],
    'check-constructor': 'off',
    'no-comma-dangle': 'off',
    'no-empty-interface': 'off',
    'no-unused-vars': 'off',

    // import
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'import/no-named-as-default': 'off',
  },
  overrides: [
    // React
    {
      files: ['*.tsx', '*.jsx'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/no-deprecated': 'error',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off', // For Next.js

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/anchor-is-valid': 'off', // For Next.js
      },
    },
    // TypeScript
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    // Jest
    {
      files: ['*.test.js', '*.spec.jsx', '*.test.ts', '*.spec.tsx'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/no-test-callback': 'warn',
      },
    },
  ],
}
