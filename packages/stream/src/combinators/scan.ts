/**
 * Incrementally accumulate results, starting with the provided initial value.
 * 
 * @name scan<A, B>(f: (seed: B, value: A) => B, initial: B, stream: Stream<A>): Stream<B>
 * @example
 * import { scan, periodic, observe } from '@motorcycle/stream'
 * 
 * // creates a stream that increments by 1 every 1000ms
 * const count$ = scan(x => x + 1, 0, periodic(1000))
 * 
 * observe(console.log, count$)
 */
export { scan } from '@most/core'
