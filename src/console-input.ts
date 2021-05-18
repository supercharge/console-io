'use strict'

import Prompt from 'prompts'
import { tap } from '@supercharge/goodies'
import { PromptBuilder } from './builder/prompt'
import { ChoiceBuilder } from './builder/choice'
import { ConfirmBuilder } from './builder/confirm'
import { QuestionBuilder } from './builder/question'
import { SecureInputBuilder } from './builder/secure'

export class ConsoleInput {
  /**
   * Ask the user for text input.
   *
   * @param {String} question
   *
   * @returns {String}
   */
  async ask<T extends string> (question: string, callback: (questionBuilder: QuestionBuilder) => unknown): Promise<T> {
    const builder = new PromptBuilder()
      .type('text')
      .question(question)

    if (callback) {
      callback(new QuestionBuilder(builder))
    }

    return await this.prompt(builder)
  }

  /**
   * Ask the user to confirm the given `question`. Returns `true` or
   * `false`, depending on whether the user confirmed or declined.
   *
   * @param {String} question
   *
   * @returns {Boolean}
   */
  async confirm (question: string, callback: (confirmBuilder: ConfirmBuilder) => unknown): Promise<boolean> {
    const builder = new PromptBuilder()
      .type('confirm')
      .question(question)

    if (callback) {
      callback(new ConfirmBuilder(builder))
    }

    return await this.prompt(builder)
  }

  /**
   * Ask the user to select one of the given `choices`.
   *
   * @param {String} question
   * @param  {Choice[]} choices
   *
   * @returns {String}
   */
  async choice (question: string, callback: (choiceBuilder: ChoiceBuilder) => unknown): Promise<string> {
    const builder = new PromptBuilder()
      .type('select')
      .question(question)

    if (typeof callback !== 'function') {
      throw new Error(`The second argument to ".choice(question, callback)" must be a function. Received ${typeof callback}`)
    }

    const choiceBuilder = new ChoiceBuilder()
    callback(choiceBuilder)

    builder.choices(
      choiceBuilder.choices()
    )

    return await this.prompt(builder)
  }

  /**
   * Ask the user for input and mask it in the terminal. This prompt is
   * useful for password inputs or when providing sensitive credentials.
   *
   * @param {String} question
   *
   * @returns  {Result}
   */
  async password (question: string, callback: (secureInputBuilder: SecureInputBuilder) => unknown): Promise<string> {
    const builder = new PromptBuilder()
      .type('password')
      .question(question)

    if (callback) {
      callback(new SecureInputBuilder(builder))
    }

    return await this.prompt(builder)
  }

  /**
   * Ask the user for sensitive input that will not be visible when typing in the terminal.
   * This prompt behaves like `sude` where the input is invisible while typing.
   *
   * @param {String} question
   *
   * @returns  {Result}
   */
  async secure (question: string): Promise<string> {
    const builder = new PromptBuilder()
      .type('invisible')
      .question(question)

    return await this.prompt(builder)
  }

  /**
   * Inject the given `answers` which will be used to answer the questions
   * when prompting the user for input. The prompt immediately resolves
   * with the given answers without asking the user for any input.
   *
   * @param {*} answers
   *
   * @returns {ConsoleInput}
   */
  injectAnswers (answers: any): this {
    return tap(this, () => {
      Prompt.inject([].concat(answers ?? []))
    })
  }

  /**
   *
   * @param builder
   * @returns
   */
  private async prompt<R>(builder: PromptBuilder): Promise<R> {
    const result = await Prompt(
      builder.name('value').build()
    )

    return result.value
  }
}
