/**
 * Applies a function to corresponding pairs of events from the input streams.
 * 
 * @name zip<A, B, C>(f: (a: A, b: B) => C, a$: Stream<A>, b$: Stream<B>): Stream<C>
 * @example
 * import { zip, observe } from '@motorcycle/stream'
 * 
 * const tuple = (x, y) => [x, y]
 * 
 * const a$ = // --1----3-------5------6----|
 * const b$ = // --------2--3--------4------|
 * //         // --------[3,2]--[5,3]--[6,4]|
 * const stream = zip(tuple, a$, b$)
 * 
 * observe(console.log, stream)
 * // [3, 2]
 * // [5, 3]
 * // [6, 4]
 */
export { zip } from '@most/core'
