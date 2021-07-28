'use strict'

const { test } = require('tap')
const { ConsoleInput } = require('../dist')

test('Console Input', async () => {
  test('ask', async t => {
    const name = await new ConsoleInput().injectAnswers('Marcus').ask('What’s your name?')
    t.equal(name, 'Marcus')

    const framework = await new ConsoleInput().injectAnswers().ask('What’s your favorite framework?', builder => {
      builder
        .defaultValue('Supercharge')
        .transform(name => String(name).toUpperCase())
    })
    t.equal(framework, 'SUPERCHARGE')
  })

  test('password', async t => {
    const password = await new ConsoleInput().injectAnswers('test').password('Password?')
    t.equal(password, 'test')

    const token = await new ConsoleInput().injectAnswers().password('Provide your token', builder => {
      builder
        .invisible()
        .defaultValue('SUPER')
        .transform(name => String(name).toLowerCase())
    })
    t.equal(token, 'super')
  })

  test('secure', async t => {
    const input = new ConsoleInput()

    const password = await input
      .injectAnswers('secr3t')
      .secure('What’s your name?')

    t.equal(password, 'secr3t')
  })

  test('confirm', async t => {
    t.equal(
      await new ConsoleInput().injectAnswers(false).confirm('Proceed?'), false
    )

    const proceed = await new ConsoleInput().injectAnswers().confirm('Proceed?', builder => {
      builder
        .defaultValue(true)
        .transform(value => value ? 1 : 0)
    })
    t.equal(proceed, 1)
  })

  test('choice', async t => {
    t.rejects(async () => {
      return new ConsoleInput().choice('Question with missing choice builder callback')
    })

    const color = await new ConsoleInput().injectAnswers('blue').choice('Color?', choices => {
      choices.add('Blue').withValue('blue').hint('blue')
      choices.add('Red').withValue('red').disabled()
      choices.add('Green').markAsSelected()
    })

    t.equal(color, 'blue')
  })
})
