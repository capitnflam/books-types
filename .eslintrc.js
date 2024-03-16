/** @type {import("eslint").Linter.Config} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  extends: ['plugin:@flaminc/recommended', 'plugin:@flaminc/node'],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  rules: {
    'n/no-missing-import': 'off',
    'import/no-unresolved': 'off',
  },
}
