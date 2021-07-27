'use strict'

import { Tag } from './tag'
import { Spinner } from './spinner'
import kleur, { Kleur } from 'kleur'
import { isNullish, tap } from '@supercharge/goodies'
import { LoggerContract, ConsoleLogger } from './logger'

export class ConsoleOutput implements LoggerContract {
  /**
   * Stores the instance state.
   */
  private readonly meta: {
    logger: LoggerContract
  }

  /**
   * Creat a new instance.
   */
  constructor () {
    this.meta = {
      logger: new ConsoleLogger()
    }
  }

  /**
   * Returns the colors instance.
   *
   * @returns {Kleur}
   */
  colors (): Kleur {
    return kleur
  }

  /**
   * Log an empty line to the console. Useful if you want to create some space to breath.
   *
   * @returns {ConsoleOutput}
   */
  blankLine (): this {
    return this.log('')
  }

  /**
   * Returns the logger instance.
   *
   * @returns {LoggerContract}
   */
  logger (): LoggerContract {
    return this.meta.logger
  }

  /**
   * Returns the logger instance.
   *
   * @returns {LoggerContract}
   */
  withLogger (logger: LoggerContract): this {
    return tap(this, () => {
      this.meta.logger = logger
    })
  }

  /**
   * Log the given `message` to the output console using `console.log`.
   *
   * @param message
   *
   * @returns {ConsoleOutput}
   */
  log (message: string): this {
    return tap(this, () => {
      this.logger().log(message)
    })
  }

  /**
   * Log the given `message` to the error console using `console.error`.
   *
   * @param message
   *
   * @returns {ConsoleOutput}
   */
  logError (message: string): this {
    return tap(this, () => {
      this.logger().logError(message)
    })
  }

  /**
   * Log the given `message` to the terminal by overwriting the previous message.
   *
   * @param {String} message
   *
   * @returns {ConsoleOutput}
   */
  logUpdate (message: string): this {
    return tap(this, () => {
      this.logger().logUpdate(message)
    })
  }

  /**
    * Persist the log message previosly written to the terminal using `logUpdate`.
    *
    * @returns {ConsoleOutput}
    */
  logUpdateDone (): this {
    return tap(this, () => {
      this.logger().logUpdateDone()
    })
  }

  /**
   * Log a success message with the given `label` and message` to the terminal.
   *
   * @param {String} label
   * @param {String} message
   *
   * @returns {ConsoleOutput}
   */
  success (label: string, message?: string): this {
    if (typeof label === 'string' && isNullish(message)) {
      return this.log(`${this.colors().green(label)}`)
    }

    if (typeof label === 'string' && typeof message === 'string') {
      return this.log(`${this.colors().bgGreen().black(label)}  ${message}`)
    }

    throw new Error('Unsupported input when logging a "success" message.')
  }

  /**
   * Log a hint message with the given `label` and message` to the terminal.
   *
   * @param {String} label
   *
   * @returns {ConsoleOutput}
   */
  hint (label: string, message?: string): this {
    if (typeof label === 'string' && isNullish(message)) {
      return this.log(`${this.colors().blue(label)}`)
    }

    if (typeof label === 'string' && typeof message === 'string') {
      return this.log(`${this.colors().bgBlue().black(label)}  ${message}`)
    }

    throw new Error('Unsupported input when logging a "hint" message.')
  }

  /**
   * Log a fail message with the given `label` and message` to the terminal.
   *
   * @param {String} label
   *
   * @returns {ConsoleOutput}
   */
  fail (label: string, message?: string): this {
    if (typeof label === 'string' && isNullish(message)) {
      return this.logError(`${this.colors().red(label)}`)
    }

    if (typeof label === 'string' && typeof message === 'string') {
      return this.logError(`${this.colors().bgRed().white().bold(label)}  ${message}`)
    }

    throw new Error('Unsupported input when logging a "fail" message.')
  }

  /**
   * Returns a new action for the given `label`.
   *
   * @param {String} label
   *
   * @returns {ConsoleOutput}
   */
  tag (label: string): Tag {
    if (typeof label === 'string') {
      return new Tag(this, label)
    }

    throw new Error(`Unsupported "label" when creating an action. Received: ${typeof label}`)
  }

  /**
   * Log the given warning `info` to the terminal.
   *
   * @param {String} message
   *
   * @returns {ConsoleOutput}
   */
  debug (message: string): this {
    if (typeof message === 'string') {
      return this.hint(' DEBUG ', message)
    }

    throw new Error(`Unsupported parameter when logging a debug message. Received: ${typeof message}`)
  }

  /**
   * Log the given warning `info` to the terminal.
   *
   * @param {String} message
   *
   * @returns {ConsoleOutput}
   */
  info (message: string): this {
    if (typeof message === 'string') {
      return this.log(`${this.colors().bgCyan().black(' INFO ')}  ${message}`)
    }

    throw new Error(`Unsupported parameter when logging an info message. Received: ${typeof message}`)
  }

  /**
   * Log the given warning `message` to the terminal.
   *
   * @param {String} message
   *
   * @returns {ConsoleOutput}
   */
  warn (message: string): this {
    if (typeof message === 'string') {
      return this.log(`${this.colors().bgYellow().black(' WARN ')}  ${message}`)
    }

    throw new Error(`Unsupported parameter when logging a warning message. Received: ${typeof message}`)
  }

  /**
   * Log the given `error` to the terminal. The `error` can be a string or an error instance.
   *
   * @param {String|Error} error
   *
   * @returns {ConsoleOutput}
   */
  error (error: string | Error): this {
    const prefix = this.colors().bgRed().white(' ERROR ')

    if (typeof error === 'string') {
      return this.fail(prefix, error)
    }

    if (error instanceof Error) {
      return this
        .fail(prefix, error.message)
        .logError(this.formatStack(error.stack))
    }

    throw new Error(`Unsupported parameter when logging an error. Received: ${typeof error}`)
  }

  /**
   * Returns the a formatted error stack, if available.
   *
   * @param {String} stack
   *
   * @returns {String}
   */
  private formatStack (stack?: string): string {
    return !stack
      ? ''
      : stack
        .split('\n')
        .splice(1)
        .map(line => `${this.colors().dim(line)}`)
        .join('\n')
  }

  /**
   * Creates and starts a spinner for the given `message`
   *
   * @param {String} message
   *
   * @returns {Spinner}
   */
  spinner (message: string): Spinner {
    return Spinner.start(message, this)
  }

  /**
   * Creates and starts a spinner with the given `message`. Then runs the
   * given `callback` and stops the spinner when not already stopped.
   *
   * @param {String} message
   * @param {SpinnerCallback} callback
   *
   * @returns {T}
   */
  async withSpinner<T = any> (message: string, callback: SpinnerCallback): Promise<T> {
    if (!message) {
      throw new Error(`You must provide a message to the "withSpinner(message, callback)" method. Received ${typeof message}`)
    }

    if (!callback) {
      throw new Error(`You must provide a callback function to the "withSpinner(message, callback)" method. Received ${typeof callback}`)
    }

    const spinner = this.spinner(message)

    return tap(await callback(spinner), () => {
      spinner.stop()
    })
  }
}

type SpinnerCallback = (spinner: Spinner) => Promise<any>
