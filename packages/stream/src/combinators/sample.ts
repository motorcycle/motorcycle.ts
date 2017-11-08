/**
 * Given each event occurrence from a sampler stream takes the latest value from
 * the given stream.
 *
 * @name sample<A>(values: Stream<A>, stream: Stream<any>): Stream<A>
 * @example
 * import { sample } from '@motorcycle/stream'
 *
 * function submit(dom: DomSource): Stream<string> {
 *   const button = query('button', dom)
 *   const input = query('input', dom)
 *
 *   const click$ = events('click', button)
 *   const value$ = map(ev => ev.target.value, events('input', input))
 *
 *   return sample(click$, value$)
 * }
 */
export { sample } from '@most/core'
