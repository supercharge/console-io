'use strict'

import { BaseBuilder } from './base'
import { tap } from '@supercharge/goodies'

export class SecureInputBuilder extends BaseBuilder {
  /**
   * This will then work like `sudo` where in the input is invisible.
   *
   * @returns {SecureInputBuilder}
   */
  invisible (): this {
    return tap(this, () => {
      this.promptBuilder.type('invisible')
    })
  }
}
