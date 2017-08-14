import { CssSelector, DomSource, StandardEvents } from '../'

import { Stream } from '@motorcycle/types'

/**
 * Creates a new DomSource or DocumentDomSource that will default to using 
 * capture when using `events()`.
 * 
 * @name useCapture(dom: DomSource | DocumentDomSource): DomSource | DocumentDomSource
 * @example 
 * import { useCapture, events } from '@motorcycle/dom'
 * 
 * export function Component(sources) {
 *   const { dom } = sources
 * 
 *   const click$ = events('click', useCapture(dom))
 * 
 *   ...
 * }
 */
export function useCapture<A = Element, B = Event>(dom: DomSource<A, B>): DomSource<A, B> {
  const useCaptureDomSource: DomSource<A, B> = {
    query(cssSelector: CssSelector): DomSource<A, B> {
      return dom.query(cssSelector)
    },

    elements(): Stream<ReadonlyArray<A>> {
      return dom.elements()
    },

    events<Ev extends B = B>(
      eventType: StandardEvents,
      options: EventListenerOptions = { capture: true }
    ): Stream<Ev> {
      return dom.events(eventType, options)
    },

    cssSelectors(): ReadonlyArray<CssSelector> {
      return dom.cssSelectors()
    },
  }

  return useCaptureDomSource
}
