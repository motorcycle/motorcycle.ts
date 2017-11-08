/**
 * Create a stream containing no events, which ends immediately.
 *
 * @name empty<A>(): Stream<A>
 * @example
 * import { empty, drain } from '@motorcycle/stream'
 *
 * const stream = empty()
 *
 * drain(stream)
 *  .then(() => console.log('complete'))
 */
export { empty } from '@most/core'
