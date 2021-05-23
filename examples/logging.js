'use strict'

const { ConsoleOutput } = require('../dist')

async function run () {
  const output = new ConsoleOutput()

  output
    .blankLine()
    .log(
      output.colors().bold('Logging')
    )
    .log('-------')
    .blankLine()
    .info('info message')
    .warn('warning message')
    .debug('debug message')
    .error('error message without stack')
    .blankLine()
    .error(new Error('error message with stack'))
    .blankLine()
    .blankLine()
    .success('Success message')
    .success(' PASS ', 'Success message with tag')
    .blankLine()
    .hint('Hint message')
    .hint(' SKIP ', 'Hint with tag')
    .blankLine()
    .fail('Fail message')
    .fail(' FAIL ', 'Error message with tag')
    .blankLine()
}

run()
