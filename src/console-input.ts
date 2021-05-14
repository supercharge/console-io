'use strict'

import Prompt, { Choice } from 'prompts'
import { PromptBuilder } from './builder/prompt'
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
  // async choice (question: string, callback: (choiceBuilder: ChoiceBuilder) => unknown): Promise<string> {
  async choice (question: string, choices: Choice[]): Promise<string> {
    const builder = new PromptBuilder()
      .type('select')
      .question(question)
      .choices(choices)

    // if (callback) {
    //   callback(new ChoiceBuilder(builder))

    //   if (!builder.hasChoices()) {
    //     throw new Error('You must provide at least one option to select from.')
    //   }
    // }

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
   * Returns a progress bar.
   */
  async progress (): Promise<any> {
    //
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
