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

  /**
   * Stores the spinner interval instance.
   */
  private spinner?: NodeJS.Timeout

  /**
   * Create a new memory logger instance.
   */
  constructor (message: string, logger: LoggerContract) {
    this.state = 'pending'
    this.logger = logger
    this.message = message
  }

  /**
   * Create an start a spinner instance.
   *
   * @returns {Spinner}
   */
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
      this.currentIndex = this.frames.length - 1
    })
  }

  /**
   * Render the spinner.
   *
   * @returns {Spinner}
   */
  private render (): this {
    return this.state === 'pending'
      ? this.clearSpinner()
      : this.createSpinner()
  }

  /**
   * Clear the spinner interval.
   *
   * @returns {Spinner}
   */
  private clearSpinner (): this {
    if (this.spinner) {
      clearInterval(this.spinner)
    }

    return this
  }

  /**
   * Create the spinner interval.
   *
   * @returns {Spinner}
   */
  private createSpinner (): this {
    this.spinner = setInterval(() => {
      this.setNextAnimationFrame().renderFrame()
    }, this.interval)

    return this
  }

  /**
   * Select the next animation frame.
   *
   * @returns {Spinner}
   */
  private setNextAnimationFrame (): this {
    return tap(this, () => {
      this.currentIndex = (this.currentIndex + 1) % this.frames.length
    })
  }

  /**
   * Render the current animation frame.
   *
   * @returns {Spinner}
   */
  private renderFrame (): this {
    return tap(this, () => {
      this.logger.logUpdate(`${this.message} ${this.frame()}`)
    })
  }

  /**
   * Reset the animation frame to the beginning.
   *
   * @returns {Spinner}
   */
  private resetAnimation (): this {
    return tap(this, () => {
      this.currentIndex = 0
    })
  }

  /**
   * Update the spinner text to the given `message`.
   *
   * @param {String} message
   */
  update (message: string): this {
    return this.setMessage(message).resetAnimation()
  }

  /**
   * Stop the spinner. Provide a `message` to update the spinner’s text before stopping it.
   *
   * @param {String} message
   */
  done (message?: string): void {
    if (message) {
      this.update(message)
    }

    this.markAsStopped()
    this.logger.logUpdateDone()
  }
}
