'use strict'

module.exports = {
  env: {
    node: true,
    es2020: true
  },
  extends: [
    '@supercharge/typescript'
  ],
  rules: {
    '@typescript-eslint/no-extraneous-class': 0,
    '@typescript-eslint/no-invalid-void-type': 0,
    '@typescript-eslint/method-signature-style': 0,
    '@typescript-eslint/strict-boolean-expressions': 0
  }
}
