'use strict'

const { ConsoleOutput } = require('../dist')

async function wait (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

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

  const spinner = output.await('Installing dependencies')
  await wait(2)
  spinner.update('updating components')
  await wait(2)
  spinner.update('completing setup')
  await wait(2)
  spinner.done('Setup complete')
}

run()
