import { DocumentDom } from './Doms'
import { Stream } from '@motorcycle/types'

/**
 * `DocumentDomFrom` function interface.
 * 
 * @name DocumentDomFrom
 * @example
 * export interface DocumentDomFrom {
 *   (d$: Stream<Document>): DocumentDom
 * }
 * @type true
 */
export interface DocumentDomFrom {
  (d$: Stream<Document>): DocumentDom
}

/**
 * Takes a `Stream<Document>` and produces a DocumentDom.
 * `Stream<Document>` is required and allows for the developer to decide which
 * events cause the stream to emit.
 * 
 * @name documentDomFrom(d$: Stream<Document>): DocumentDom
 * @example
 * import { documentDomFrom } from '@motorcycle/dom'
 * import { makeDomComponent } from '@motorcycle/mostly-dom'
 * import { constant } from '@motorcycle/stream'
 * import { UI } from './UI'
 * 
 * const element = document.querySelector('#app-container') as Element
 * const Dom = makeDomComponent(element)
 * 
 * function dialogue(rs) {
 *   const { view$ } = rs
 *   const d$ = constant(document, view$)
 *   const { dom } = Dom({ view$ })
 *   
 *   return {
 *     dom,
 *     documentDom: documentDomFrom(d$)
 *   }
 * }
 */
export const documentDomFrom: DocumentDomFrom = (d$: Stream<Document>) => new DocumentDom(d$)
