'use strict'

import { tap } from '@supercharge/goodies'

export class Spinner {
  /**
   * The message rendered in front of the spinner.
   */
  private readonly message: string

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
   * The animation steps.
   */
  private readonly frames = ['.  ', '.. ', '...', ' ..', '  .', '   ']

  /**
   * Create a new memory logger instance.
   */
  constructor (message: string) {
    this.state = 'pending'
    this.message = message
  }

  /**
   * Returns the array of stored log messages.
   *
   * @returns {MemoryLog[]}
   */
  start (): this {
    return tap(this, () => {
      this.markAsStarted().render()
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

  private render (): void {
    if (this.state === 'pending') {
      return
    }

    setTimeout(() => {
      this.incrementIndex().render()
    }, this.interval)
  }

  private incrementIndex (): this {
    return tap(this, () => {
      this.currentIndex = this.frames.length === this.currentIndex + 1
        ? 0
        : this.currentIndex + 1
    })
  }

  /**
   * Stop the spinner.
   */
  done (): void {
    this.markAsStopped()
  }
}
