'use strict'

import { tap } from '@supercharge/goodies'
import { Choice as ChoiceContract } from 'prompts'

class Choice<ValueType = any> {
  public title: string
  public value?: ValueType
  public isDisabled?: boolean
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
  withValue (value: ValueType): this {
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
    console.log('This method is deprecated and will be removed in a future release. Use ".disabled()" instead.')

    return this.disabled()
  }

  /**
   * Mark this choice as disabled.
   *
   * @returns {Choice}
   */
  disabled (): this {
    return tap(this, () => {
      this.isDisabled = true
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

export class ChoiceBuilder<ValueType = any> {
  /**
   * Stores the builder meta data.
   */
  private readonly meta: {
    choices: Array<Choice<ValueType>>
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
  add (title: string): Choice<ValueType> {
    return tap(new Choice<ValueType>(title), choice => {
      this.addChoice(choice)
    })
  }

  /**
   * Add the given `choice` to the list of choices.
   *
   * @param {Choice} choice
   *
   * @returns {ChoiceBuilder}
   */
  private addChoice (choice: Choice<ValueType>): this {
    return tap(this, () => {
      this.meta.choices.push(choice)
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
        disabled: choice.isDisabled,
        selected: choice.selected
      }
    })
  }
}
