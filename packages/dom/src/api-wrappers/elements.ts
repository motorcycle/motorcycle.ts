import { DomSource } from '../'
import { Stream } from '@motorcycle/types'

/**
 * Takes a DomSource and returns a stream of Array of elements matches
 * previous queries.
 *
 * @name elements<A = Element, B = Event>>(dom: DomSource<A, B>): Stream<ReadonlyArray<A>>
 * @example
 * import { DomSource, elements } from '@motorcycle/dom'
 *
 * type Sources = { dom: DomSource }
 *
 * function Component(sources: Sources) {
 *   const { dom } = sources
 *
 *   const elements$ = elements(dom)
 *
 *   ...
 * }
 */
export function elements<A = Element, B = Event>(dom: DomSource<A, B>): Stream<ReadonlyArray<A>> {
  return dom.elements()
}
