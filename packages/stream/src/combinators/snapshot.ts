/**
 * For each event in a sampler stream, apply a function to combine it with the
 * most recent event in another stream. The resulting stream will contain the
 * same number of events as the sampler stream.
 *
 * @name snapshot<A, B, C>(f: (a: A, b: B) => C, values: Stream<A>, sampler: Stream<B>): Stream<C>
 * @example
 * s1:                       -1--2--3--4--5->
 * sampler:                  -1-----2-----3->
 * sample(sum, sampler, s1): -2-----5-----8->
 *
 * s1:                       -1-----2-----3->
 * sampler:                  -1--2--3--4--5->
 * sample(sum, sampler, s1): -2--3--5--6--8->
 *
 */
export { snapshot } from '@most/core'
