import { Stream } from '@motorcycle/types'
import { map as arrayMap } from '167'
import { curry2 } from '@most/prelude'
import { map } from './map'

/**
 * Applies a function to all Sinks in a list of Sinks.
 * 
 * @name mapSinks<Sinks, A>(f: (sinks: Sinks, index: number) => A, sinksList$: Stream<Array<Sinks>>): Stream<ReadonlyArray<A>>
 * @example
 * import { mapSinks } from '@motorcycle/stream'
 * 
 * function Component(sources) {
 *   const { listOfData$ } = sources
 * 
 *   const sinksList$: Stream<ReadonlyArray<Sinks>> = map(
 *     listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) })), 
 *     listOfData$,
 *   )
 * 
 *   const childViews$: Stream<ReadonlyArray<Stream<VNode>> = 
 *     mapSinks(sinks => sinks.view$, sinksList$)
 * 
 *   ...
 * }
 */
export const mapSinks: MapSinksArity2 = curry2(function mapSinks<
  Sinks extends { readonly [key: string]: Stream<any> },
  A
>(
  f: (sinks: Sinks, index: number) => A,
  sinksList$: Stream<Array<Sinks>>
): Stream<ReadonlyArray<A>> {
  return map<Array<Sinks>, ReadonlyArray<A>>(arrayMap(f), sinksList$)
})

export interface MapSinksArity2 {
  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<Array<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<ArrayLike<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<ReadonlyArray<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A
  ): MapSinksArity1<Sinks, A>
}

export interface MapSinksArity1<Sinks extends { readonly [key: string]: Stream<any> }, A> {
  (sinksList$: Stream<Array<Sinks>>): Stream<ReadonlyArray<A>>
  (sinksList$: Stream<ArrayLike<Sinks>>): Stream<ReadonlyArray<A>>
  (sinksList$: Stream<Readonly<Sinks>>): Stream<ReadonlyArray<A>>
}
