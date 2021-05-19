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
    <a href="#docs"><strong>Usage</strong></a>
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

## Introduction
The `@supercharge/console-io` package is a CLI UI kit. It provides an opinionated styling for console outputs and allows you to easily retrieve user retrieve input from the terminal.


## Installation

```
npm i @supercharge/console-io
```


## Table of Contents

- [Usage](#usage)
- [Input](#input)
  - `input.ask(message, builder?)`
  - `input.confirm(message, builder?)`
  - `input.password(message, builder?)`
  - `input.secure(message, builder?)`
  - `input.choice(message, builder?)`
- [Output](#output)
  - Logging
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
  - Tags
    - `output.tag(label).success(message)`
    - `output.tag(label).info(message, reason?)`
    - `output.tag(label).failed(message, reason?)`

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
Intro

```js
const { ConsoleInput } = require('@supercharge/console-io')

async function askForAndPrintTheName () {
  const input = new ConsoleInput()
  const output = new ConsoleOutput()

  // asking the for input
  const name = await input.ask('What’s your name')

  // printing output to the terminal
  io.success('Hello', name)
}
```

### Questions (`ask`)
Intro

```js
const { ConsoleInput } = require('@supercharge/console-io')

//
const name = await io.ask('What’s your name')
```

#### Using the Question Builder
Intro

```js
const { ConsoleInput } = require('@supercharge/console-io')

const input = new ConsoleInput()
const name = await input.ask('What’s your name', builder => {
  builder
    .defaultValue('Marcus')
    .transform(value => String(value).toUpperCase())
})

// `name` when pressing enter using the default value: MARCUS
// `name` when providing 'test': TEST
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
