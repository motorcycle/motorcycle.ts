/**
 * Applies a function to the most recent event from all streams when a new 
 * event arrives on any stream.
 * 
 * @name combineArray<A, B, C>(f: (a: A, b: B) => C, streams: [ Stream<A>, Stream<B> ]): Stream<C>
 * @example
 * import { combineArray, now, merge, at, observe } from '@motorcycle/stream'
 * 
 * const a$ = now(1000)
 * const b$ = now(2000)
 * const c$ = merge(at(100, 1), at(200, 2))
 * 
 * const sum = (x, y, z) => x + y + z
 * 
 * const stream = combineArray(sum, [ a$, b$, c$ ])
 * 
 * observe(console.log, stream)
 * // 3001 -- at time 100 as result of sum(1000, 2000, 1)
 * // 30002 -- at time 200 as result of sum(1000, 2000, 2)
 */
export { combineArray } from '@most/core'
