import { CssSelector, Dom, StandardEventTypes } from '../'

import { Stream } from '@motorcycle/types'

export interface UseCaptureFn {
  <A = Element, B = Event>(d: Dom<A, B>): Dom<A, B>
}

/**
 * Creates a new Dom that will default to using capture when using `event()`.
 * 
 * @name useCapture<A = Element, B = Event>(d: Dom<A, B>): Dom<A, B>
 * @example 
 * import { useCapture, event } from '@motorcycle/dom'
 * 
 * export function component(ss) {
 *   const { dom } = ss
 * 
 *   const click$ = events('click', useCapture(dom))
 * 
 *   ...
 * }
 */
export const useCapture: UseCaptureFn = function<A = Element, B = Event>(d: Dom<A, B>) {
  const useCaptureDom: Dom<A, B> = {
    query(cssSelector: CssSelector): Dom<A, B> {
      return d.query(cssSelector)
    },

    elements(): Stream<ReadonlyArray<A>> {
      return d.elements()
    },

    event<Ev extends B = B>(
      et: StandardEventTypes,
      o: EventListenerOptions = { capture: true }
    ): Stream<Ev> {
      return d.event(et, o)
    },

    cssSelectors(): ReadonlyArray<CssSelector> {
      return d.cssSelectors()
    },
  }

  return useCaptureDom
}
