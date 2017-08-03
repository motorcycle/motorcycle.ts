import { CssSelector, DomSource, StandardEvents } from '../types'

import { Stream } from '@motorcycle/types'

export function useCapture(dom: DomSource): DomSource {
  const useCaptureDomSource: DomSource = {
    query(cssSelector: CssSelector): DomSource {
      return dom.query(cssSelector)
    },

    elements<El extends Element = Element>(): Stream<ReadonlyArray<El>> {
      return dom.elements()
    },

    events<Ev extends Event = Event>(
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
