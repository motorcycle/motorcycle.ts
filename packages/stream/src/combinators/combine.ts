/**
 * Apply a function to the most recent event from each stream when a new event arrives on any stream.
 * 
 * @name combine<A, B, C>(f: (a: A, b: B) => C, a$: Stream<A>, b$: Stream<B>): Stream<C>
 * @example
 * import { combine, at, merge, observe } from '@motorcycle/stream'
 * 
 * const a$ = merge(at(100, 100), at(200, 200))
 * const b$ = merge(at(200, 3000), at(250, 100))
 * 
 * const stream = combine(add, a$, b$)
 * 
 * observe(console.log, stream)
 * // 3200 -- at time 200 as a result of add(200, 3000)
 * // 350 -- at time 250 as a result of add(200, 100)
 */
export { combine } from '@most/core'
