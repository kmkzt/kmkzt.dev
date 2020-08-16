module.exports = {
  env: {
    node: true,
  },
  extends: ['@kmkzt/eslint-config/lib/javascript'],
  overrides: [
    {
      files: ['*.tsx', '*.jsx'],
      extends: ['@kmkzt/eslint-config/lib/react'],
      rules: {
        // For Next.js
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['@kmkzt/eslint-config/lib/typescript'],
    },
    {
      files: ['*.test.*', '*.spec.*'],
      extends: ['@kmkzt/eslint-config/lib/jest'],
    },
  ],
}
