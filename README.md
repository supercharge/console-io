<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Console IO</h3>
  </p>
  <p>
    Opinionated UI kit for CLI inputs and outputs.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#table-of-contents"><strong>Table of Contents</strong></a>
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/console-io"><img src="https://img.shields.io/npm/v/@supercharge/console-io.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/console-io"><img src="https://img.shields.io/npm/dm/@supercharge/console-io.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

![Supercharge: Console IO Logging](https://github.com/supercharge/console-io/blob/main/assets/logging-preview.png)


## Introduction
The `@supercharge/console-io` package is a CLI UI kit. It provides an opinionated styling for console outputs and allows you to easily retrieve user retrieve input from the terminal.


## Installation

```
npm i @supercharge/console-io
```


## Table of Contents

- [Usage](#usage)
- [Input](#input)
  - [`input.ask(message, builder?)`](#inputaskmessage-builder)
  - [`input.confirm(message, builder?)`](#inputconfirmmessage-builder)
  - [`input.password(message, builder?)`](#inputpasswordmessage-builder)
  - [`input.secure(message)`](#inputsecuremessage)
  - [`input.choice(message, builder)`](#inputchoicemessage-builder)
- [Output](#output)
  - [Logging](#logging)
    - [`output.log(message)`](#outputlogmessage)
    - [`output.logError(message)`](#outputlogerrormessage)
    - [`output.blankLine()`](#outputblankline)
    - [`output.info(message)`](#outputinfomessage)
    - [`output.warn(message)`](#outputwarnmessage)
    - [`output.debug(message)`](#outputdebugmessage)
    - [`output.error(message|Error)`](#outputerrormessage--error)
    - [`output.success(labelOrMessage, message?)`](#outputsuccesslabelormessage-message)
    - [`output.hint(labelOrMessage, message?)`](#outputhintlabelormessage-message)
    - [`output.fail(labelOrMessage, message?)`](#outputfaillabelormessage-message)
  - [Tags](#tags)
    - [`output.tag(label).success(message)`](#outputtaglabelsuccessmessage)
    - [`output.tag(label).info(message, reason?)`](#outputtaglabelinfomessage-reason)
    - [`output.tag(label).failed(message, reason?)`](#outputtaglabelfailedmessage-reason)
  - [Spinner](#spinner)
    - [`output.spinner(message)`](#outputspinnermessage)
    - [`output.withSpinner(message, callback)`](#outputwithspinnermessage-callback)


## Usage
Using `@supercharge/console-io` is pretty straightforward.

```js
const { ConsoleInput, ConsoleOutput } = require('@supercharge/console-io')

async function askForAndPrintTheName () {
  const input = new ConsoleInput()
  const output = new ConsoleOutput()

  // asking the for input
  const name = await io.ask('What’s your name')

  // printing output to the terminal
  output.success('Hello', name)
}
```


## Input
The package exports a `ConsoleInput` class. This class allows you to prompt users for input on the command line.

For example, you may ask the user for text input or to confirm/decline a given question.

Here’s how you create a console input instance called `input`. The following console input examples refer to this `input` instance when calling the individual methods.

```js
const { ConsoleInput } = require('@supercharge/console-io')

const input = new ConsoleInput()
```


#### input.ask(message, builder?)
Prompts the user for text input:

```js
const name = await input.ask('What’s your name')
```

The `ask` method accepts an optional builder callback as the second argument. This builder callback allows you to refine the question. Refining the question can be defining a default value or transforming the answer:

```js
const name = await input.ask('What’s your name', builder => {
  builder
    .defaultValue('Marcus')
    .transform(answer => String(answer).toUpperCase())
})

// `name` when pressing enter using the default value: MARCUS
// `name` when providing 'test' as the value: TEST
```


#### input.confirm(message, builder?)
Prompts the user for a confirmation returning `true` or `false`:

```js
const proceed = await input.confirm('This deletes all files. Proceed?')
```

The `confirm` method accepts a builder callback as the second argument. This builder callback allows you to refine the question. Refining the question can be defining a default value or transforming the answer:

```js
const proceed = await input.confirm('This deletes all files. Proceed?', builder => {
  builder
    .defaultValue(false)
    .transform(answer => answer ? 1 : 0) // transforms `true` to `1` and `false` to `0`
})

// `proceed` when pressing enter using the default value: 0
// `proceed` when selecting the truthy value: 1
```


#### input.password(message, builder?)
Prompts the user for a password input. The typed input is masked with stars:

```js
const password = await input.password('Provide your password')
```

The `password` method accepts a builder callback as the second argument. This builder callback allows you to refine the password prompt: you can make the input visible, like the password prompts on Linux systems:

```js
const password = await input.password('Provide your password (not visible when typing)', builder => {
  builder
    .invisible()
    .transform(name => String(name).toLowerCase())
})

// `password` when typing "Supercharge": "supercharge"
```


#### input.secure(message)
Prompts the user for a secure input which is not visible when the user types the input:

```js
const secret = await input.secure('Provide your password')
```

The `secure` method accepts is a shortcut to an invisible password prompts. It doesn’t show the input, not even masked with stars.


#### input.choice(message, builder)
Prompts the user to select from a list of choices. Use the `builder` in the callback function to create and configure the available choices:

```js
const choice = await input.choice('Choose your favorite framework', builder => {
  builder.add('Supercharge').withValue('supercharge')
  builder.add('Express').withValue('express').disabled()
})

// `choice` when selecting "Supercharge": "supercharge"
```


## Output
The package exports a `ConsoleOutput` class. This class allows you to print expressive and colored messages to the terminal.

For example, you may use console output to create expressive and colored terminal messages.

Here’s how you create a console output instance called `output`. The following console output examples refer to this `output` instance when calling the individual methods:

```js
const { ConsoleOutput } = require('@supercharge/console-io')

const output = new ConsoleOutput()
```

### Logging
The console output exposes a handful methods. Here’s a preview how the console output looks like:

![Supercharge: Console IO Output](https://github.com/supercharge/console-io/blob/main/assets/logging-all.png)


#### output.log(message)
Prints a log message to `stdout`. Works like `console.log` but uses the log renderer. Log renderers can be swapped for better testing:

```js
output.log('Supercharge is sweet!')
```


#### output.logError(message)
Prints a log message to `stderr`. Works like `console.error` but uses the log renderer. Log renderers can be swapped for better testing:

```js
output.log('Supercharge is sweet!')
```


#### output.blankLine()
Prints an empty line to the terminal. Useful to create whitespace:

```js
output.blankLine()
```


#### output.info(message)
Prints the given info `message` to the terminal. Info messages will be prefixed with an “INFO” tag on a cyan background:

```js
output.info('info message')
```


#### output.warn(message)
Prints the given warning `message` to the terminal. Warning messages will be prefixed with a “WARN” tag on a yellow background:

```js
output.info('warning message')
```


#### output.debug(message)
Prints the given debug `message` to the terminal. Debug messages will be prefixed with a “DEBUG” tag on a blue background:

```js
output.debug('debug message')
```


#### output.error(message | Error)
Prints the given error `message` or message from the `Error` instance to the terminal. Error messages will be prefixed with an “ERROR” tag on a red background:

```js
output.debug('debug message')
```

When providing an `Error` instance, the stack trace will be printed dimmed below the error message.


#### output.success(labelOrMessage, message?)
Prints a success message to the terminal. When providing a single parameter to `.success(message)`, the text will be printed in green. You may provide the label and message parameters to create a success tag for the given `label` with the related `message`:

```js
// just a success message
output.success('Green-colored success message')

// success message with label
output.success('SUCCESS', 'success message')
```


#### output.hint(labelOrMessage, message?)
Prints a hint message to the terminal. When providing a single parameter to `.hint(message)`, the text will be printed in blue. You may provide the label and message parameters to create a hint tag for the given `label` with the related `message`:

```js
// just a hint message
output.hint('Blue-colored hint message')

// hint message with label
output.hint('SKIPPED', 'hint message')
```


#### output.fail(labelOrMessage, message?)
Prints a fail message to the terminal. When providing a single parameter to `.fail(message)`, the text will be printed in red. You may provide the label and message parameters to create a fail tag for the given `label` with the related `message`:

```js
// just a fail message
output.fail('Red-colored fail message')

// fail message with label
output.fail('FAILED', 'fail message')
```


### Tags
The `ConsoleOutput` class provides a `.tag(label)` method creating a pending tag output. The pending tag must be completed with a given message. The tag message relates to one of the available states. The tag states define the colors. At this point, there are three tags availabe: `success`, `info`, `failed`.


![Supercharge: Console IO Output](https://github.com/supercharge/console-io/blob/main/assets/tags.png)


#### output.tag(label).success(message)
Prints a success tag to the terminal. The tag `label` is printed with dark text on a green background. The `message` provides more context data:

```js
output.tag(' FINISHED ').success('Database migrations')
```


#### output.tag(label).info(message, reason?)
Prints an info tag to the terminal. The tag `label` is printed with dark text on a blue background. The `message` provides more context data:

```js
output.tag(' IGNORED ').info('config/app.js file for this run')
output.tag(' SKIPPED ').info('Copying .env', 'File already exists.')
```

#### output.tag(label).failed(message, reason?)
Prints a fail tag to the terminal. The tag `label` is printed with dark text on a red background. The `message` provides more context data:

```js
output.tag(' FAILED ').failed('to copy .env file', 'File already exists.')
```


### Spinner
A `ConsoleOutput` instance provides the `.spinner(message)` and `.withSpinner(message, callback)` methods creating and returning a loading spinner with the given `message`. You can process long-running tasks while showing the loading spinner. You must manually stop the when using the `.spinner(message)` method. Stopping and starting the spinner is handled for you when using the `.withSpinner(message, callback)` method.


![Supercharge: Console IO Spinner](https://github.com/supercharge/console-io/blob/main/assets/spinner.gif)


#### Spinner Interface
You can change the state (message) of a loading spinner by using one of the following three methods:

- `spinner.update(message)`: update the previous spinner text to the given `message`
- `spinner.done(message?)`: stop the spinner and mark it as “done”. Optionally update the spinner text to the given `message`
- `spinner.fail(message?)`: stop the spinner and mark it as “failed”. Optionally update the spinner text to the given `message`


#### output.spinner(message)
Creates and returns a started loading spinner for the given `message`:

```js
const spinner = output.spinner('Installing dependencies')
await installDependencies()

spinner.update('Processing long-running task')
await processOtherLongRunningTask()

spinner.stop('Setup complete')
```


#### output.withSpinner(message, callback)
Returns a promise and runs the given `callback` action. The `callback` receives a started loading spinner instance. Using this method allows you to group actions of a long-running task into a callback function:

```js
const result = await output.withSpinner('Installing dependencies', async spinner => {
  await installDependencies()

  spinner.update('Completing setup')
  await completeSetup()

  /**
   * You can manually stop the spinner with a custom message. You can also skip
   * stopping the spinner here if you’re fine using the previous message as
   * the "done" message. Stopping the spinner is already handled for you.
   */
  spinner.stop('Setup complete')

  /**
   * You may return a value from this callback and use it later in your code.
   */
  return { done: true }
})
```

You must handle errors youself in case one of your methods inside the `callback` throws an error. A common approach is wrapping your code in a `try/catch` block and handling the error after catching it. Here’s an example on how you may handle errors:

```js
try {
  await output.withSpinner('A failing spinner', async () => {
    throw new Error('Uff, failed!')
  })
} catch (error) {
  output.error(error.message)
}
```


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
