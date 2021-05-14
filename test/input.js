'use strict'

const { test } = require('tap')
const { ConsoleInput } = require('../dist')

test('Application', async t => {
  t.pass(() => {
    const input = new ConsoleInput()
    input.secure('question')
  })
})
