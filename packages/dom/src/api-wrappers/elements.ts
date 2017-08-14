import { DomSource } from '../'
import { Stream } from '@motorcycle/types'

/**
 * Takes a DomSource and returns a stream of Array of elements matches 
 * previous queries. Also accepts `DocumentDomSource` and will return a strean
 * containing Document at index 0.
 * 
 * @name elements<El extends Element>(dom: DomSource): Stream<ReadonlyArray<El>>
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
