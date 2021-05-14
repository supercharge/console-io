'use strict'

module.exports = {
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'standard-with-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-invalid-void-type': 0,
    '@typescript-eslint/method-signature-style': 0,
    '@typescript-eslint/strict-boolean-expressions': 0
  }
}
