'use strict'

const { ConsoleOutput } = require('../dist')

async function run () {
  const output = new ConsoleOutput()

  output
    .blankLine()
    .debug('debug message')
    .info('info message')
    .warn('warning message')
    .error('error message without stack')
    .blankLine()
    .error(new Error('error message with stack'))
    .blankLine()
    .blankLine()
    .log('Tags')
    .log('----')
    .blankLine()
    .success('Success message')
    .success(' PASS ', 'Success message with label')
    .blankLine()
    .hint('Hint message')
    .hint(' SKIP ', 'Hint with tag')
    .blankLine()
    .fail('Tests failed')
    .fail(' FAIL ', 'tests/auth/jwt.ts')
    .blankLine()
    .tag(' FINISHED ').success('Database migrations')
    .tag(' IGNORED ').info('config/app.js file for this run')
    .tag(' SKIPPED ').info('Copying .env', 'File already exists.')
    .tag(' FAILED ').failed('to copy .env file', 'File already exists.')
    .blankLine()
}

run()
