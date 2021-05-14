'use strict'

import { tap } from '@supercharge/goodies'
import { Choice, PromptObject, PromptType } from 'prompts'

export class PromptBuilder {
  /**
   * The prompt configuration object.
   */
  private prompt: PromptObject<string> = { type: false, name: 'value' }

  /**
   * Set the prompt type to the given `type`.
   *
   * @param {String} type
   *
   * @returns {PromptBuilder}
   */
  public type (type: PromptType): this {
    return tap(this, () => {
      this.prompt.type = type
    })
  }

  /**
   * Set the prompt type to the given `type`.
   *
   * @param {String} name
   *
   * @returns {PromptBuilder}
   */
  public name (name: string): this {
    return tap(this, () => {
      this.prompt.name = name
    })
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} question
   *
   * @returns {PromptBuilder}
   */
  public question (question: string): this {
    return tap(this, () => {
      this.prompt.message = question
    })
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} value
   *
   * @returns {PromptBuilder}
   */
  public initial (value?: string): this {
    return tap(this, () => {
      this.prompt.initial = value
    })
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} value
   *
   * @returns {PromptBuilder}
   */
  public transform (transformer: (value: unknown) => any): this {
    return tap(this, () => {
      this.prompt.format = transformer
    })
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} question
   *
   * @returns {PromptBuilder}
   */
  public choices (choices: Choice[]): this {
    return tap(this, () => {
      this.prompt.choices = choices
    })
  }

  /**
   * Returns the prompt configuration object for Enquirer.
   *
   * @returns {Object}
   */
  public build (): PromptObject {
    return this.prompt
  }
}
