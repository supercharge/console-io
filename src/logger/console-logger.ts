'use strict'

import { tap } from '@supercharge/goodies'
import { LoggerContract } from './logger-contract'

export class ConsoleLogger implements LoggerContract {
  /**
   * Log the given `message` to the output console using `console.log`.
   *
   * @param message
   *
   * @returns {ConsoleOutput}
   */
  log (message: string): this {
    return tap(this, () => {
      console.log(message)
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
      console.error(message)
    })
  }
}
