# Changelog


## [2.0.0](https://github.com/supercharge/console-io/compare/v1.3.0...v2.0.0) - 2022-xx-xx

### Updated
- bump dependencies

### Breaking Changes
- Require Node.js v14 or later, drop support for Node.js v12


## [1.3.0](https://github.com/supercharge/console-io/compare/v1.2.0...v1.3.0) - 2022-03-01

### Added
- support generic return type of `input.choice<ValueType>()`

### Updated
- bump dependencies


## [1.2.0](https://github.com/supercharge/console-io/compare/v1.1.0...v1.2.0) - 2021-07-28

### Added
- Adding the missing `input.choice()` documention in the Readme

#### Output
- `output.spinner(message)` method creating a spinner with the given `message`
- `output.withSpinner(message, callback)` method creating a spinner that runs the given `callback` action
- ignore `helper*` files when running tests
- `output.logUpdate()` method to replace the previous log message with a new one
  - this is useful for tasks that outline the current step
- `output.logUpdateDone()` method telling the logger to stop replacing the previous message and log new lines again

#### Input
- added `.disabled()` method to choice builder (when using `input.choice(message, builder)`)


### Updated
- bump dependencies
- `log` and `logError` methods accept `any` type: this fixes issues when using TypeScript where logging anything but strings would cause a type error


## [1.1.0](https://github.com/supercharge/console-io/compare/v1.0.0...v1.1.0) - 2021-06-09

### Added
- move `@types/prompts` from devDependencies to dependencies because we’re exporting the needed type information

### Updated
- bump dependencies


## 1.0.0 - 2021-05-23

### Added
- `1.0.0` release 🚀 🎉
