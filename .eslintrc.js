module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'no-await-in-loop': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'no-restricted-syntax': 'off',
    'import/no-unresolved': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
