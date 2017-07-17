/**
 * Timeshift a stream by a number of milliseconds.
 * 
 * @name delay<A>(ms: number, stream: Stream<A>): Stream<A>
 * @example
 * import { delay } from '@motorcycle/stream'
 * 
 * const source = -1--2--3--4--5---->
 * //             ----1--2--3--4--5->
 * const stream = delay(3, source)
 */
export { delay } from '@most/core'
