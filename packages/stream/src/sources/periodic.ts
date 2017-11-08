/**
 * Creates a stream that emits ever time 0 and every `n` milliseconds after.
 *
 * @name periodic(ms: number): Stream<void>
 * @example
 * import { periodic } from '@motorcycle/stream'
 *
 * // void----void----void----void---->
 * const stream = periodic(5)
 */
export { periodic } from '@most/core'
