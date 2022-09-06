module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: 'standard-with-typescript',
  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-typescript/base',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  rules: {},
};
