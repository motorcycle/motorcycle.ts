/**
 * Given a higher-order stream, return a new stream that adopts the behavior of
 * (ie emits the events of) the most recent inner stream.
 *
 * @name switchLatest<A>(stream: Stream<Stream<A>>): Stream<A>
 * @example
 * import { switchLatest, now } from '@motorcycle/stream'
 *
 * const A = // -1--2--3----->
 * const B = // -4--5--6----->
 * const C = // -7--8--9----->
 *
 * // --A-----B-----C-------->
 * const source = // ...
 *
 * // ---1--2--4--5--7--8--9->
 * const stream = switchLatest(source)
 */
export { switchLatest } from '@most/core'
