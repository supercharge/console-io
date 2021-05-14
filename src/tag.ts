'use strict'

import { ConsoleOutput } from './console-output'

export class Tag {
  /**
   * The console output instance.
   */
  private readonly output: ConsoleOutput

  /**
   * The tag’s label.
   */
  private readonly label: string

  /**
   * Create a new instance.
   */
  constructor (output: ConsoleOutput, label: string) {
    this.label = label
    this.output = output
  }

  /**
   * Prints a succeess `message` to the console for the assigned tag.
   *
   * @param {String} message
   * @param {String} reason
   *
   * @returns {ConsoleOutput}
   */
  success (message: string): ConsoleOutput {
    return this.output.success(this.label, message)
  }

  /**
   * Prints an info `message` to the console for the assigned tag and the optional `reason`.
   *
   * @param {String} message
   * @param {String} reason
   *
   * @returns {ConsoleOutput}
   */
  info (message: string, reason?: string): ConsoleOutput {
    return this.output.hint(this.label, `${message}${this.formatReason(reason)}`)
  }

  /**
   * Prints a fail `message` to the console for the assigned tag and the optional `reason`.
   *
   * @param {String} message
   * @param {String} reason
   *
   * @returns {ConsoleOutput}
   */
  failed (message: string, reason?: string): ConsoleOutput {
    return this.output.fail(this.label, `${message}${this.formatReason(reason)}`)
  }

  /**
   * Returns a color-formatted string of the given `reason`.
   * Returns an empty if no reason is provided.
   *
   * @param {String} reason
   *
   * @returns {String}
   */
  private formatReason (reason?: string): string {
    if (!reason) {
      return ''
    }

    return `: ${this.output.colors().dim(reason)}`
  }
}
