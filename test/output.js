'use strict'

const { test } = require('tap')
const { ConsoleOutput, MemoryLogger } = require('../dist')

test('Console Output', async () => {
  test('colors exist', async t => {
    const output = new ConsoleOutput()
    t.ok(output.colors())
  })

  test('prints empty line', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.blankLine()

    t.same(logger.logs(), [{ message: '', stream: 'stdout' }])
  })

  test('prints debug log', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.debug('message')

    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes(' DEBUG '))
    t.ok(logger.logs()[0].message.includes('  message'))
  })

  test('throws for invalid debug log', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    t.throws(() => output.debug())
    t.throws(() => output.debug(123))
    t.throws(() => output.debug(['a', 'b']))
  })

  test('prints info log', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.info('message')

    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes(' INFO '))
    t.ok(logger.logs()[0].message.includes('  message'))
  })

  test('throws for invalid info log', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.info())
    t.throws(() => output.info(123))
    t.throws(() => output.info(['a', 'b']))
  })

  test('prints warning log', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.warn('message')

    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes(' WARN '))
    t.ok(logger.logs()[0].message.includes('  message'))
  })

  test('throws for invalid warning log', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.warn())
    t.throws(() => output.warn(123))
    t.throws(() => output.warn(['a', 'b']))
  })

  test('prints error log', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.error('message')

    t.equal(logger.logs()[0].stream, 'stderr')
    t.ok(logger.logs()[0].message.includes(' ERROR '))
    t.ok(logger.logs()[0].message.includes('  message'))
  })

  test('prints error with stack trace', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.error(new Error('message'))

    t.equal(logger.logs().length, 2)
    t.equal(logger.logs()[0].stream, 'stderr')

    t.ok(logger.logs()[0].message.includes(' ERROR '))
    t.ok(logger.logs()[0].message.includes('  message'))

    t.ok(logger.logs()[1].message.includes(process.cwd()))
  })

  test('prints error without stack trace', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    const error = new Error('message')
    delete error.stack

    output.error(error)

    t.equal(logger.logs().length, 2)
    t.notOk(logger.logs()[1].message.includes(process.cwd()))
  })

  test('throws for invalid error log', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.error())
    t.throws(() => output.error(123))
    t.throws(() => output.error(['a', 'b']))
  })

  test('Tag: success', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.tag('CREATED').success('Supercharge')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('CREATED'))
    t.ok(logger.logs()[0].message.includes('  Supercharge'))
  })

  test('prints a success message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.success('success message')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('success message'))

    logger.clearLogs()

    output.success('welcome', 'Supercharge')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('welcome'))
    t.ok(logger.logs()[0].message.includes('Supercharge'))
  })

  test('throws for invalid success input', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.success())
    t.throws(() => output.success(123))
    t.throws(() => output.success(['a', 'b']))
  })

  test('prints a hint message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.hint('hint message')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('hint message'))

    logger.clearLogs()

    output.hint('welcome', 'Supercharge')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('welcome'))
    t.ok(logger.logs()[0].message.includes('Supercharge'))
  })

  test('throws for invalid hint input', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.hint())
    t.throws(() => output.hint(123))
    t.throws(() => output.hint(['a', 'b']))
  })

  test('prints a fail message', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.fail('fail message')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stderr')
    t.ok(logger.logs()[0].message.includes('fail message'))

    logger.clearLogs()

    output.fail('welcome', 'Supercharge')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stderr')
    t.ok(logger.logs()[0].message.includes('welcome'))
    t.ok(logger.logs()[0].message.includes('Supercharge'))
  })

  test('throws for invalid fail input', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.fail())
    t.throws(() => output.fail(123))
    t.throws(() => output.fail(['a', 'b']))
  })

  test('Tag: info', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.tag('notice').info('details here')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stdout')
    t.ok(logger.logs()[0].message.includes('notice'))
    t.ok(logger.logs()[0].message.includes('  details here'))
  })

  test('Tag: failed', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.tag('FaileD').failed('to create the file')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stderr')
    t.ok(logger.logs()[0].message.includes('FaileD'))
    t.ok(logger.logs()[0].message.includes('  to create the file'))
  })

  test('Tag: failed with reason', async t => {
    const logger = new MemoryLogger()
    const output = new ConsoleOutput().withLogger(logger)

    output.tag('FaileD').failed('to create the file', 'already existing')

    t.equal(logger.logs().length, 1)
    t.equal(logger.logs()[0].stream, 'stderr')
    t.ok(logger.logs()[0].message.includes('FaileD'))
    t.ok(logger.logs()[0].message.includes('  to create the file:'))
    t.ok(logger.logs()[0].message.includes('already existing'))
  })

  test('Tag: throws for invalid input', async t => {
    const output = new ConsoleOutput()

    t.throws(() => output.tag())
    t.throws(() => output.tag(123))
  })
})
