'use strict'

import { tap } from '@supercharge/goodies'
import { BaseBuilder } from './base'

class Choice {
  private meta: {
    title: string
    value?: string
    description?: string
    disabled?: boolean
    default?: boolean
  }

  constructor (title: string) {
    this.meta = { title }
  }

  hint (description: string): this {
    return tap(this, () => {
      this.meta.description = description
    })
  }

  value (value: any): this {
    return tap(this, () => {
      this.meta.value = value
    })
  }

  disabled (): this {
    return tap(this, () => {
      this.meta.disabled = true
    })
  }

  markAsDefault (): this {
    return tap(this, () => {
      this.meta.default = true
    })
  }
}

export class ChoiceBuilder extends BaseBuilder {
  add (title: string): Choice {
    return tap(new Choice(title), _choice => {
      // this.promptBuilder.choices([choice])
    })
  }
}
