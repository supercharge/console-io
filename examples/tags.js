'use strict'

const { ConsoleOutput } = require('../dist')

async function run () {
  const output = new ConsoleOutput()

  output
    .blankLine()
    .log(
      output.colors().bold('Tags')
    )
    .log('----')
    .blankLine()
    .tag(' FINISHED ').success('Database migrations')
    .tag(' IGNORED ').info('config/app.js file for this run')
    .tag(' SKIPPED ').info('Copying .env', 'File already exists.')
    .tag(' FAILED ').failed('to copy .env file', 'File already exists.')
    .blankLine()
}

run()
