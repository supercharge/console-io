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
    Build beautiful console inputs and outputs.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#docs"><strong>Docs</strong></a> ·
    <a href="#api"><strong>API</strong></a>
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
The `@supercharge/console-io` package allows you to retrieve input from and print output to the console.


## Installation

```
npm i @supercharge/console-io
```


## Docs
Find all the [details for `@supercharge/console-io` in the extensive Supercharge docs](https://superchargejs.com/docs/console).


## Usage
Using `@supercharge/console-io` is pretty straightforward. The package exports a handful of methods that you can reach for when requiring the package:

```js
const { ConsoleIO, ConsoleInput } = require('@supercharge/console-io')

async function askForAndPrintTheName () {
  const io = new ConsoleIO()

  // asking the for input
  const name = await io.ask('What’s your name')

  // printing output to the terminal
  io.success('Hello', name)
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
> GitHub [@supercharge](https://github.com/supercharge/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
