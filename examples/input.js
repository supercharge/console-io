'use strict'

const { ConsoleInput } = require('../dist')
const input = new ConsoleInput()

async function ask () {
  const name = await input.ask('What’s your name?', builder => {
    builder
      .defaultValue('Marcus')
      .transform(value => String(value).toUpperCase())
  })

  const age = await input.ask('What’s your age?', builder => {
    builder
      .defaultValue(123)
      .transform(value => Number(value))
  })

  return { name, age }
}

async function confirm () {
  return await input.confirm('Proceed?', builder => {
    builder.defaultValue(true)
  })
}

async function choice () {
  return await input.choice('What color do you like?', choice => {
    choice.add('Marcus').withValue('marcus').disabled()
    choice.add('Norman').withValue('norman').hint('this dude ey')
    choice.add('Christian').withValue('christian').markAsSelected()
  })
}

async function password () {
  const password = await input.password('Enter your password', builder => {
    builder.defaultValue('tester')
  })

  const passwordRepeat = await input.password('Repeat your password (will not be not visible)', builder => {
    builder.defaultValue('tester').invisible()
  })

  return { password, passwordRepeat }
}

async function secure () {
  return await input.secure('Enter your secret token (not visible)')
}

async function run () {
  const { name, age } = await ask()
  const confirmed = await confirm()
  const chosen = await choice()
  const { password: pass, passwordRepeat } = await password()
  const secret = await secure()

  console.log('')
  console.log({ name, age, confirmed, chosen, password: pass, passwordRepeat, secret })
}

run()
