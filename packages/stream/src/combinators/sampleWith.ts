import { Stream } from '@motorcycle/types'
import { sample } from './sample'

/**
 * Given each event occurrence from a sampler stream takes the latest value from 
 * the given stream. 
 * 
 * @name sampleWith<A>(sampler: Stream<any>, stream: Stream<A>): Stream<A>
 * @example
 * import { sampleWith } from '@motorcycle/stream'
 * 
 * function submit(dom: DomSource): Stream<string> {
 *   const button = query('button', dom)
 *   const input = query('input', dom)
 * 
 *   const click$ = events('click', button)
 *   const value$ = map(ev => ev.target.value, events('input', input))
 * 
 *   return sampleWith(click$, value$)
 * }
 */
export const sampleWith = sample(takeRight) as SampleWith

export interface SampleWith {
  <A>(sampler: Stream<any>, stream: Stream<A>): Stream<A>
  <A>(sampler: Stream<any>): (stream: Stream<A>) => Stream<A>
  (sampler: Stream<any>): <A>(stream: Stream<A>) => Stream<A>
}

function takeRight<A>(_: any, value: A): A {
  return value
}
