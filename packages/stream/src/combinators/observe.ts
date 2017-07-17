import { Stream } from '@motorcycle/types'
import { curry2 } from '@most/prelude'
import { drain } from './drain'
import { tap } from './tap'

/**
 * Activates a stream, calling a function `f` with each event value, and returns 
 * a Promise of completion.
 * 
 * @name observe<A>(f: (value: A) => any, stream: Stream<A>): Promise<void>
 */
export const observe: Observe = curry2(<A>(f: (value: A) => any, stream: Stream<A>): Promise<
  void
> => drain(tap(f, stream)))

export interface Observe {
  <A>(f: (value: A) => any, stream: Stream<A>): Promise<void>
  <A>(f: (value: A) => any): (stream: Stream<A>) => Promise<void>
}
