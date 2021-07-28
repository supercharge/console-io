'use strict'

const Sinon = require('sinon')
const { test } = require('tap')
const { ConsoleOutput } = require('../dist')

test('Console Logger', async t => {
  test('logs info message to console', async t => {
    const consoleLogSpy = Sinon.stub(console, 'log').returns()
    const consoleErrorSpy = Sinon.stub(console, 'error').returns()

    const output = new ConsoleOutput()

    output.info('Hello Supercharge')

    t.ok(consoleLogSpy.called)
    t.ok(consoleErrorSpy.notCalled)

    consoleLogSpy.restore()
    consoleErrorSpy.restore()
  })

  test('logs error message to console', async t => {
    const consoleLogSpy = Sinon.stub(console, 'log').returns()
    const consoleErrorSpy = Sinon.stub(console, 'error').returns()

    const output = new ConsoleOutput()

    output.error('Error!')

    t.ok(consoleErrorSpy.called)
    t.ok(consoleLogSpy.notCalled)

    consoleLogSpy.restore()
    consoleErrorSpy.restore()
  })

  test('logUpdate & logUpdateDone', async t => {
    const consoleLogSpy = Sinon.spy(process.stdout, 'write')
    const output = new ConsoleOutput()

    output.logUpdate('hello')
    t.ok(consoleLogSpy.called)

    consoleLogSpy.restore()
  })
})
