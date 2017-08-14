import { DocumentDomSource } from './DomSources'
import { Stream } from '@motorcycle/types'

/**
 * Takes in `Stream<Document>` and produces a DocumentDomSource.
 * `Stream<Document>` is required and allows for the developer to decide which
 * events cause the stream to emit.
 * 
 * @name createDocumentDomSource(document$: Stream<Document>): DocumentDomSource
 * @example
 * import { createDocumentDomSource } from '@motorcycle/dom'
 * import { makeDomComponent } from '@motorcycle/mostly-dom'
 * import { constant } from '@motorcycle/stream'
 * import { UI } from './UI'
 * 
 * const element = document.querySelector('#app-container') as Element
 * 
 * const Dom = makeDomComponent(element)
 * 
 * function Effects(sinks) {
 *   const { view$ } = sinks
 *   
 *   const document$ = constant(document, view$)
 * 
 *   const { dom } = Dom({ view$ })
 *   
 *   return {
 *     dom,
 *     document: createDocumentDomSource(document$)
 *   }
 * }
 */
export function createDocumentDomSource(document$: Stream<Document>): DocumentDomSource {
  return new DocumentDomSource(document$)
}
