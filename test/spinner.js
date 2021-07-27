'use strict'

const { test } = require('tap')
const { wait } = require('./helper')
const { ConsoleOutput, MemoryLogger } = require('../dist')

test('Spinner', async () => {
  test('spinner', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    const spinner = output.spinner('Supercharge')
    t.equal(logger.logs().length, 1)
    t.same(logger.logs(), [{ message: 'Supercharge .  ', stream: 'stdout' }])

    spinner.stop()
    t.equal(logger.logs().length, 1)
    t.same(logger.logs(), [{ message: 'Supercharge \u001b[32m[done]\u001b[39m', stream: 'stdout' }])
  })

  test('is loading', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    const spinner = output.spinner('Supercharge')
    t.same(logger.logs(), [{ message: 'Supercharge .  ', stream: 'stdout' }])

    await wait(200)
    t.same(logger.logs(), [{ message: 'Supercharge .. ', stream: 'stdout' }])

    await wait(200)
    t.same(logger.logs(), [{ message: 'Supercharge ...', stream: 'stdout' }])

    await wait(200)
    t.same(logger.logs(), [{ message: 'Supercharge  ..', stream: 'stdout' }])

    await wait(200)
    t.same(logger.logs(), [{ message: 'Supercharge   .', stream: 'stdout' }])

    await wait(200)
    t.same(logger.logs(), [{ message: 'Supercharge    ', stream: 'stdout' }])

    spinner.stop()
  })

  test('withSpinner - throws for missing message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await t.rejects(async () => {
      return output.withSpinner()
    })
  })

  test('withSpinner - throws for missing action callback', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await t.rejects(async () => {
      return output.withSpinner('message')
    })
  })

  test('update', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await output.withSpinner('Supercharge', spinner => {
      spinner.update('new message')
      t.same(logger.logs(), [{ message: 'new message .  ', stream: 'stdout' }])

      spinner.stop()
    })
  })

  test('stop', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await output.withSpinner('Supercharge', spinner => {
      spinner.stop('stop')
      t.same(logger.logs(), [{ message: 'stop \u001b[32m[done]\u001b[39m', stream: 'stdout' }])

      spinner.stop('this will not show up')
      t.same(logger.logs(), [{ message: 'stop \u001b[32m[done]\u001b[39m', stream: 'stdout' }])
    })
  })

  test('fail', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)
    try {
      await output.withSpinner('Supercharge', () => {
        throw new Error()
      })

      t.fail() // should not be reached
    } catch (error) {
      t.same(logger.logs(), [{ message: 'Supercharge \u001b[31m[failed]\u001b[39m', stream: 'stdout' }])
    }
  })

  test('fail with message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await output.withSpinner('Supercharge', spinner => {
      spinner.fail('Woops')
    })

    t.same(logger.logs(), [{ message: 'Woops \u001b[31m[failed]\u001b[39m', stream: 'stdout' }])
  })
})
