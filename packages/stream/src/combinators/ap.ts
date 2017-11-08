/**
 * Applies a stream of functions to the latest from a stream of values.
 *
 * @name ap<A, B>(fns: Stream<(value: A) => B>, values: Stream<A>): Stream<B>
 * @example
 * import { ap, now, periodic, scan, skip, observe } from '@motorcycle/stream'
 *
 * const count$ = scan(x => x + 1, 0, skip(1, periodic(100)))
 *
 * const fn$ = now(x => x * x)
 *
 * const stream = ap(fn$, count$)
 *
 * observe(console.log, stream)
 * // 0
 * // 4
 * // 9
 * // ...
 */
export { ap } from '@most/core'
