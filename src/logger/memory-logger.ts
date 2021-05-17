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
  private readonly meta: {
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
   * Save the given `message` into memory.
   *
   * @param message
   *
   * @returns {MemoryLogger}
   */
  log (message: string): this {
    return tap(this, () => {
      this.logs().push({ message, stream: 'stdout' })
    })
  }

  /**
   * Save the given `message` into memory
   *
   * @param message
   *
   * @returns {MemoryLogger}
   */
  logError (message: string): this {
    return tap(this, () => {
      this.logs().push({ message, stream: 'stderr' })
    })
  }
}
