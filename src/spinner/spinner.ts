'use strict'

import { tap } from '@supercharge/goodies'
import { LoggerContract } from '../logger'

export class Spinner {
  /**
   * The logger instance.
   */
  private readonly logger: LoggerContract

  /**
   * The message rendered in front of the spinner.
   */
  private message: string

  /**
   * The spinner state.
   */
  private state: 'pending' | 'running'

  /**
   * The animation duration.
   */
  private readonly interval: number = 200

  /**
   * The current animation index.
   */
  private currentIndex: number = 0

  /**
   * The animation frames.
   */
  private readonly frames = ['.  ', '.. ', '...', ' ..', '  .', '   ']

  private spinner?: any

  /**
   * Create a new memory logger instance.
   */
  constructor (message: string, logger: LoggerContract) {
    this.state = 'pending'
    this.logger = logger
    this.message = message
  }

  static start (message: string, logger: LoggerContract): Spinner {
    return new this(message, logger).start()
  }

  /**
   * Returns the current loading animation frame.
   *
   * @returns {String}
   */
  private frame (): string {
    return this.frames[this.currentIndex]
  }

  /**
   * Returns the array of stored log messages.
   *
   * @returns {MemoryLog[]}
   */
  private start (): this {
    return tap(this, () => {
      this.markAsStarted().render()
    })
  }

  /**
   * Mark this spinner as started.
   *
   * @returns {Spinner}
   */
  private setMessage (message: string): this {
    return tap(this, () => {
      this.message = message
    })
  }

  /**
   * Mark this spinner as started.
   *
   * @returns {Spinner}
   */
  private markAsStarted (): this {
    return tap(this, () => {
      this.state = 'running'
    })
  }

  /**
   * Mark this spinner as stopped.
   *
   * @returns {Spinner}
   */
  private markAsStopped (): this {
    return tap(this, () => {
      this.state = 'pending'
    })
  }

  private render (): this {
    if (this.state === 'pending') {
      return this
    }

    this.logger.logUpdate(`${this.message} ${this.frame()}`)

    clearInterval(this.spinner)

    this.spinner = setInterval(() => {
      this.incrementIndex().render()
    }, this.interval)

    return this
  }

  private incrementIndex (): this {
    return tap(this, () => {
      this.currentIndex = this.frames.length === this.currentIndex + 1
        ? 0
        : this.currentIndex + 1
    })
  }

  /**
   * Update the spinner text to the given `message`.
   *
   * @param {String} message
   */
  update (message: string): this {
    if (message) {
      this.setMessage(message)
    }

    return this
  }

  /**
   * Stop the spinner. Provide a `message` to update the spinner’s text before stopping it.
   *
   * @param {String} message
   */
  done (message?: string): void {
    this
      .update(message ?? '')
      .markAsStopped()

    this.logger.logUpdateDone()
  }
}
