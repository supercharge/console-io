'use strict'

const { ConsoleOutput } = require('../dist')

async function sleep (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

async function run () {
  const output = new ConsoleOutput()

  const spinner = output.spinner('Installing dependencies')
  await sleep(2)
  spinner.stop()

  const result = await output.withSpinner('Updating components', async spinner => {
    await sleep(2)
    spinner.update('Completing setup')
    await sleep(2)

    return { done: true }
  })

  output
    .log('result ->', result)
    .blankLine()

  try {
    await output.withSpinner('A failing spinner', async () => {
      spinner.fail()
      throw new Error('Uff, failed!')
    })
  } catch (error) {
    output.error(error.message)
  }
}

run()
