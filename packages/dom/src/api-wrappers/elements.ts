import { DocumentDomSource, DomSource } from '../'

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
export function elements(dom: DocumentDomSource): Stream<ReadonlyArray<Document>>
export function elements<El extends Element>(dom: DomSource): Stream<ReadonlyArray<El>>

export function elements(dom: any) {
  return dom.elements()
}
