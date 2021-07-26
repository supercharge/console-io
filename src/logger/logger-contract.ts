'use strict'

export interface LoggerContract {
  /**
   * Log the given `message` to the output console using `console.log`.
   */
  log (message: string): this

  /**
   * Log the given `message` to the error console using `console.error`.
   */
  logError (message: string): this

  /**
   * Log the given `message` to the terminal by overwriting the previous message.
   */
  logUpdate (message: string): this

  /**
   * Persist the log message previosly written to the terminal using `logUpdate`.
   */
  logUpdateDone (): this
}
