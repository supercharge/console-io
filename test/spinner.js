'use strict'

const { test } = require('tap')
const { wait } = require('./helper')
const { ConsoleOutput, MemoryLogger, Spinner } = require('../dist')

test('Spinner', async () => {
  test('spinner', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    const spinner = output.spinner('Supercharge')
    t.equal(logger.logs().length, 1)
    t.same(logger.logs(), [{ message: 'Supercharge .  ', stream: 'stdout' }])

    spinner.stop()
    t.equal(logger.logs().length, 1)
    t.ok(logger.logs()[0].message.includes('Supercharge '))
    t.ok(logger.logs()[0].message.includes('[done]'))
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
      t.notOk(logger.logs()[0].message.includes('Supercharge '))
      t.ok(logger.logs()[0].message.includes('stop '))
      t.ok(logger.logs()[0].message.includes('[done]'))

      spinner.stop('second stop')
      t.notOk(logger.logs()[0].message.includes('second stop'))
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
      t.ok(logger.logs()[0].message.includes('Supercharge '))
      t.ok(logger.logs()[0].message.includes('[failed]'))
    }
  })

  test('fail with message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    await output.withSpinner('Supercharge', spinner => {
      spinner.fail('Woops')
      spinner.fail('Different Woops')
    })

    t.ok(logger.logs()[0].message.includes('Woops '))
    t.ok(logger.logs()[0].message.includes('[failed]'))
    t.notOk(logger.logs()[0].message.includes('Different Woops'))
  })

  test('clearSpinner', async t => {
    const spinner = new Spinner('message')

    t.equal(spinner.clearSpinner() instanceof Spinner, true)
  })
})
