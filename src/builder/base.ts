'use strict'

import { tap } from '@supercharge/goodies'
import { PromptBuilder } from './prompt'

export class BaseBuilder {
  /**
   * The prompt configuration object.
   */
  protected readonly promptBuilder: PromptBuilder

  /**
   * Create a new question builder instance.
   */
  constructor (promptBuilder: PromptBuilder) {
    this.promptBuilder = promptBuilder
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} value
   *
   * @returns {BaseBuilder}
   */
  public defaultValue (value?: string): this {
    return tap(this, () => {
      this.promptBuilder.initial(value)
    })
  }

  /**
   * Set the prompt message to the given `question`.
   *
   * @param {String} value
   *
   * @returns {BaseBuilder}
   */
  public transform<R> (formatter: (value: any) => R | Promise<R>): this {
    return tap(this, () => {
      this.promptBuilder.transform(formatter)
    })
  }
}
