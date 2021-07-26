'use strict'

import LogUpdate from 'log-update'
import { tap } from '@supercharge/goodies'
import { LoggerContract } from './logger-contract'

export class ConsoleLogger implements LoggerContract {
  /**
   * Log the given `message` to the output console using `console.log`.
   *
   * @param {String} message
   *
   * @returns {ConsoleLogger}
   */
  log (message: string): this {
    return tap(this, () => {
      console.log(message)
    })
  }

  /**
   * Log the given `message` to the error console using `console.error`.
   *
   * @param {String} message
   *
   * @returns {ConsoleLogger}
   */
  logError (message: string): this {
    return tap(this, () => {
      console.error(message)
    })
  }

  /**
   * Log the given `message` to the terminal by overwriting the previous message.
   *
   * @param {String} message
   *
   * @returns {ConsoleLogger}
   */
  logUpdate (message: string): this {
    return tap(this, () => {
      LogUpdate(message)
    })
  }

  /**
    * Persist the log message previosly written to the terminal using `logUpdate`.
    *
    * @returns {ConsoleLogger}
    */
  logUpdateDone (): this {
    return tap(this, () => {
      LogUpdate.done()
    })
  }
}
