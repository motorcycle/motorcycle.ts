import { Stream } from '@motorcycle/types'
import { sample } from './sample'

export const sampleWith = sample(takeRight) as SampleWith

export interface SampleWith {
  <A>(sampler: Stream<any>, stream: Stream<A>): Stream<A>
  <A>(sampler: Stream<any>): (stream: Stream<A>) => Stream<A>
  (sampler: Stream<any>): <A>(stream: Stream<A>) => Stream<A>
}

function takeRight<A>(_: any, value: A): A {
  return value
}
