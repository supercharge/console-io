'use strict'

import { tap } from '@supercharge/goodies'
import { LoggerContract } from './logger-contract'

interface MemoryLog {
  message: string
  stream: 'stdout' | 'stderr'
}

export class MemoryLogger implements LoggerContract {
  /**
   * Stores the log messages.
   */
  private meta: {
    logs: MemoryLog[]
  }

  /**
   * Create a new memory logger instance.
   */
  constructor () {
    this.meta = { logs: [] }
  }

  /**
   * Returns the array of stored log messages.
   *
   * @returns {MemoryLog[]}
   */
  logs (): MemoryLog[] {
    return this.meta.logs
  }

  /**
   * Delete existing logs.
   *
   * @returns {MemoryLogger}
   */
  clearLogs (): MemoryLogger {
    return tap(this, () => {
      this.meta.logs = []
    })
  }

  /**
   * Save the given `message` into memory.
   *
   * @param message
   *
   * @returns {MemoryLogger}
   */
  log (message: any): this {
    return tap(this, () => {
      this.logs().push({ message, stream: 'stdout' })
    })
  }

  /**
   * Save the given `message` into memory.
   *
   * @param message
   *
   * @returns {MemoryLogger}
   */
  logError (message: any): this {
    return tap(this, () => {
      this.logs().push({ message, stream: 'stderr' })
    })
  }

  /**
   * Save the given `message` into memory.
   *
   * @param message
   *
   * @returns {MemoryLogger}
   */
  logUpdate (message: string): this {
    return tap(this, () => {
      this.logs().pop()
      this.log(message)
    })
  }

  /**
   * Persist the log message previosly written to the terminal using `logUpdate`.
   */
  logUpdateDone (): this {
    // nothing to do here in the memory logger because not altering the terminal

    return this
  }
}
