'use strict'

const { test } = require('tap')
const { ConsoleOutput, MemoryLogger } = require('../dist')

test('Console Output', t => {
  test('Tags', t => {
    test('success', async t => {
      const logger = new MemoryLogger()
      const output = new ConsoleOutput().withLogger(logger)

      output.tag('CREATED').success('Supercharge')

      t.same(logger.logs(), [{
        // black text on green background
        message: '\u001b[42m\u001b[30mCREATED\u001b[49m\u001b[39m  Supercharge',
        stream: 'stdout'
      }])
    })

    t.end()
  })

  // test('Tags', t => {
  //   test('success', t => {
  //     const output = new ConsoleOutput()
  //     output.tag('')
  //     t.not(output.colors(), null)
  //     t.end()
  //   })
  // })

  t.end()
})
