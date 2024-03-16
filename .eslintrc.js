/** @type {import("eslint").ESLint} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  extends: ['plugin:@flaminc/recommended', 'plugin:@flaminc/node'],
  parserOptions: {
    project: './tsconfig.lint.json',
  },
}
