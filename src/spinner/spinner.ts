'use strict'

import { tap } from '@supercharge/goodies'
import { ConsoleOutput } from '../console-output'

export class Spinner {
  /**
   * The console output instance.
   */
  private readonly output: ConsoleOutput

  /**
   * The message rendered in front of the spinner.
   */
  private message: string

  /**
   * The spinner state.
   */
  private state: 'idle' | 'running' | 'failed'

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
   * Create a new spinner instance.
   */
  constructor (message: string, output: ConsoleOutput) {
    this.state = 'idle'
    this.output = output
    this.message = message
  }

  /**
   * Create an start a spinner instance.
   *
   * @returns {Spinner}
   */
  static start (message: string, output: ConsoleOutput): Spinner {
    return new this(message, output).start()
  }

  /**
   * Starts the spinner.
   *
   * @returns {Spinner}
   */
  private start (): this {
    return tap(this, () => {
      this.markAsStarted().render()
    })
  }

  /**
   * Use the given `message` and display it in front of the spinner.
   *
   * @param {String} message
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
      this.state = 'idle'
      this.currentIndex = this.frames.length - 1
    })
  }

  /**
   * Mark this spinner as failed.
   *
   * @returns {Spinner}
   */
  private markAsFailed (): this {
    return tap(this, () => {
      this.state = 'failed'
      this.currentIndex = this.frames.length - 1
    })
  }

  /**
   * Determine whether the spinner is running.
   *
   * @returns {Boolean}
   */
  private isRunning (): boolean {
    return !this.isStopped()
  }

  /**
   * Determine whether the spinner is stopped.
   *
   * @returns {Boolean}
   */
  private isStopped (): boolean {
    return this.state === 'idle' || this.isFailed()
  }

  /**
   * Determine whether the spinner is stopped.
   *
   * @returns {Boolean}
   */
  private isFailed (): boolean {
    return this.state === 'failed'
  }

  /**
   * Render the spinner.
   *
   * @returns {Spinner}
   */
  private render (): this {
    return this.state === 'running'
      ? this.ensureSpinner().renderFrame()
      : this.clearSpinner()
  }

  /**
   * Create the spinner interval.
   *
   * @returns {Spinner}
   */
  private ensureSpinner (): this {
    this.spinner = setInterval(() => {
      this.setNextAnimationFrame().renderFrame()
    }, this.interval)

    return this
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
   * Render the current animation frame or mark the task as done.
   *
   * @returns {Spinner}
   */
  private renderFrame (): this {
    if (this.isRunning()) {
      this.output.logUpdate(`${this.message} ${this.frame()}`)

      return this
    }

    this.isFailed()
      ? this.output.logUpdate(`${this.message} ${this.output.colors().red('[failed]')}`)
      : this.output.logUpdate(`${this.message} ${this.output.colors().green('[done]')}`)

    return this
  }

  /**
   * Returns the current animation frame.
   *
   * @returns {String}
   */
  private frame (): string {
    return this.frames[this.currentIndex]
  }

  /**
   * Update the spinner text to the given `message`.
   *
   * @param {String} message
   */
  update (message: string): this {
    return this.setMessage(message).renderFrame()
  }

  /**
   * Stop the spinner with an optional `message`. When passing a
   * message it updates the spinner’s text before stopping it.
   *
   * @param {String} message
   */
  stop (message?: string): void {
    if (this.isStopped()) {
      return
    }

    if (message) {
      this.update(message)
    }

    this.markAsStopped().cleanUp()
  }

  /**
   * Stop the spinner and mark it as failed with an optional `message`. When
   * passing a message it updates the spinner’s text before stopping it.
   *
   * @param {String} message
   */
  fail (message?: string): void {
    if (this.isStopped()) {
      return
    }

    if (message) {
      this.update(message)
    }

    this.markAsFailed().cleanUp()
  }

  /**
   * Update the spinner’s text and clean up any internal state belonging to this spinner.
   */
  private cleanUp (): void {
    this.renderFrame().clearSpinner()
    this.output.logUpdateDone()
  }
}
