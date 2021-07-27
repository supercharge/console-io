'use strict'

const { test } = require('tap')
const { MemoryLogger } = require('../dist')

test('Memory Logger', async () => {
  test('logUpdate', async t => {
    const logger = new MemoryLogger()
    logger.logUpdate('Supercharge')
    t.equal(logger.logs().length, 1)
    t.same(logger.logs(), [{ message: 'Supercharge', stream: 'stdout' }])

    logger.logUpdate('You look great!')
    t.equal(logger.logs().length, 1)
    t.same(logger.logs(), [{ message: 'You look great!', stream: 'stdout' }])

    logger.logUpdateDone()

    logger.log('Supercharge')
    t.equal(logger.logs().length, 2)
    t.same(logger.logs(), [
      { message: 'You look great!', stream: 'stdout' },
      { message: 'Supercharge', stream: 'stdout' }
    ])
  })
})
