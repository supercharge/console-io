'use strict'

import { tap } from '@supercharge/goodies'
import { ConsoleInput } from './console-input'
import { ConsoleOutput } from './console-output'

/**
 * Create the IO interface merging the types of ConsoleInput and ConsoleOutput.
 */
interface IO extends ConsoleInput, ConsoleOutput {}
class IO {}

/**
 * Export the IO class representing the merged ConsoleInput and ConsoleOutput classes.
 */
export const ConsoleIO = tap(IO, () => {
  applyMixins(IO, [ConsoleInput, ConsoleOutput])
})

/**
 * Merge the given classes into the base class.
 *
 * https://www.typescriptlang.org/docs/handbook/mixins.html
 */
function applyMixins (derivedCtor: any, constructors: any[]): void {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ?? Object.create(null)
      )
    })
  })
}
