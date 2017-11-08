/**
 * Returns a stream equivalent to the original, but which can be shared more
 * efficiently among multiple consumers.
 *
 * @name multicast<A>(stream: Stream<A>): Stream<A>
 * @example
 * import { multicast, observe } from '@motorcycle/stream'
 *
 * // --1--2--3--4--5--6--7--8-->
 * const source = // ...
 *
 * // --1--2--3--4--5--6--7--8-->
 * observe(console.log, source)
 *
 * setTimeout(() => {
 * // --------------1--2--3--4--5--6--7--8-->
 *   observe(console.log, source)
 * }, 5)
 *
 * const stream = multicast(source)
 *
 * // --1--2--3--4--5--6--7--8-->
 * observe(console.log, stream)
 *
 * setTimeout(() => {
 * // --------------5--6--7--8-->
 *   observe(console.log, stream)
 * }, 5)
 */
export { multicast } from '@most/core'
