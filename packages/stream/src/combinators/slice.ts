/**
 * Keep only events in a range, where start <= index < end, and index is the
 * ordinal index of an event in stream.
 *
 * @name slice<A>(skip: number, take: number, stream: Stream<A>): Stream<A>
 * @example
 * import { slice } from '@most/core'
 *
 * const source = // --1--2--3--4--5--6--7--8--9--10-->
 * //                --------3--4--5|
 * const stream = slice(2, 3, source)
 */
export { slice } from '@most/core'
