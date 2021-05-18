'use strict'

import { tap } from '@supercharge/goodies'
import { Choice as ChoiceContract } from 'prompts'

class Choice {
  public title: string
  public value?: string
  public disabled?: boolean
  public selected?: boolean
  public description?: string

  /**
   * Create a new instance with the given `title`.+
   *
   * @param {String} title
   */
  constructor (title: string) {
    this.title = title
  }

  /**
   * Show the given `description` as a hint.
   *
   * @param {String} description
   *
   * @returns {Choice}
   */
  hint (description: string): this {
    return tap(this, () => {
      this.description = description
    })
  }

  /**
   * Assign the given `value` to this choice. This value will be the
   * return value when prompting the user to select a given answer.
   *
   * @param {*} value
   *
   * @returns {Choice}
   */
  withValue (value: any): this {
    return tap(this, () => {
      this.value = value
    })
  }

  /**
   * Mark this choice as disabled.
   *
   * @returns {Choice}
   */
  markAsDisabled (): this {
    return tap(this, () => {
      this.disabled = true
    })
  }

  /**
   * Mark this choice as selected.
   *
   * @returns {Choice}
   */
  markAsSelected (): this {
    return tap(this, () => {
      this.selected = true
    })
  }
}

export class ChoiceBuilder {
  /**
   * Stores the builder meta data.
   */
  private readonly meta: {
    choices: Choice[]
  }

  /**
   * Create a new instance.
   */
  constructor () {
    this.meta = { choices: [] }
  }

  /**
   * Create a new answer with the given `title`.
   *
   * @param {String} title
   *
   * @returns {Choice}
   */
  add (title: string): Choice {
    return tap(new Choice(title), choice => {
      this.addChoice(choice)
    })
  }

  /**
   * Returns the list of choices.
   *
   * @returns {Choice[]}
   */
  choices (): ChoiceContract[] {
    return this.meta.choices.map((choice, index) => {
      return {
        title: choice.title,
        value: choice.value ?? index,
        description: choice.description,
        disabled: choice.disabled,
        selected: choice.selected
      }
    })
  }

  /**
   * Add the given `choice` to the list of choices.
   *
   * @param {Choice} choice
   *
   * @returns {ChoiceBuilder}
   */
  private addChoice (choice: Choice): this {
    return tap(this, () => {
      this.meta.choices.push(choice)
    })
  }
}
