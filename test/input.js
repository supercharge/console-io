'use strict'

const { test } = require('tap')
const { ConsoleInput } = require('../dist')

test('Console Input', async t => {
  test('ask', async t => {
    const input = new ConsoleInput()
    input.injectAnswers('Marcus')

    const name = await input.ask('What’s your name?')
    t.equal(name, 'Marcus')
  })

  t.end()
})
