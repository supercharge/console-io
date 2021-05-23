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
    - `output.log(message)`
    - `output.logError(message)`
    - `output.blankLine()`
    - `output.debug(message)`
    - `output.info(message)`
    - `output.warn(message)`
    - `output.error(message)`
    - `output.error(Error)`
    - `output.success(labelOrMessage, message?)`
    - `output.hint(labelOrMessage, message?)`
    - `output.fail(labelOrMessage, message?)`
  - [Tags](#tags)
    - [`output.tag(label).success(message)`](#outputtaglabelsuccessmessage)
    - [`output.tag(label).info(message, reason?)`](#outputtaglabelinfomessage)
    - [`output.tag(label).failed(message, reason?)`](#outputtaglabelfailedmessage)


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


---


### input.ask(message, builder?)
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


---


### input.confirm(message, builder?)
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


---


### input.password(message, builder?)
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


---


### input.secure(message)
Prompts the user for a secure input which is not visible when the user types the input:

```js
const secret = await input.secure('Provide your password')
```

The `secure` method accepts is a shortcut to an invisible password prompts. It doesn’t show the input, not even masked with stars.


---


### input.choice(message, builder)
Tba.

```js
const choice = await input.choice('Choose your favorite framework', builder => {
  builder.add('Supercharge').withValue('supercharge')
  builder.add('Express').withValue('express').markAsDisabled()
})

// `choice` when selecting "Supercharge": "supercharge"
```


## Output
The package exports a `ConsoleOutput` class. This class allows you to print expressive and colored messages to the terminal.


### Logging
Tba.

![Supercharge: Console IO Output](https://github.com/supercharge/console-io/blob/main/assets/logging-all.png)

Text


### Tags
The `ConsoleOutput` class provides a `.tag(label)` method creating a pending tag output. The pending tag must be completed with a given message. The tag message relates to one of the available states. The tag states define the colors. At this point, there are three tags availabe: `success`, `info`, `failed`.


![Supercharge: Console IO Output](https://github.com/supercharge/console-io/blob/main/assets/tags.png)


#### output.tag(label).success(message)
Prints a success tag to the terminal. The tag `label` is printed with dark text on a green background. The `message` provides more context data:

```js
output.tag(' PASS ').success('All tests pass.')
```


#### output.tag(label).info(message)
Prints an info tag to the terminal. The tag `label` is printed with dark text on a blue background. The `message` provides more context data:

```js
output.tag(' SKIPPED ').info('All tests pass.')
```

#### output.tag(label).failed(message)
Prints a fail tag to the terminal. The tag `label` is printed with dark text on a red background. The `message` provides more context data:

```js
output.tag(' FAIL ').failed('All tests pass.')
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
> GitHub [@supercharge](https://github.com/supercharge/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
