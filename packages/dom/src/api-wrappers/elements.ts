import { DomSource } from '../types'
import { Stream } from '@motorcycle/types'

/**
 * Takes a DomSource and returns a stream of Array of elements matches 
 * previous queries.
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
export function elements<El extends Element>(dom: DomSource): Stream<ReadonlyArray<El>> {
  return dom.elements<El>()
}
