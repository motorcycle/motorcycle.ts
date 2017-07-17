/**
 * Applies a function to corresponding pairs of events from the input streams.
 * 
 * @name zipArray<A, B, C>(f: (a: A, b: B) => C, streams: [Stream<A>, Stream<B>]): Stream<C>
 * @example
 * import { zipArray, observe } from '@motorcycle/stream'
 * 
 * const tuple = (x, y) => [x, y]
 * 
 * const a$ = // --1----3-------5------6----|
 * const b$ = // --------2--3--------4------|
 * //         // --------[3,2]--[5,3]--[6,4]|
 * const stream = zipArray(tuple [a$, b$])
 * 
 * observe(console.log, stream)
 * // [3, 2]
 * // [5, 3]
 * // [6, 4]
 */
export { zipArray } from '@most/core'
