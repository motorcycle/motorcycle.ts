import { CssSelector, DocumentDomSource, DomSource, StandardEvents } from '../'

import { Stream } from '@motorcycle/types'

export function useCapture(dom: DomSource): DomSource
export function useCapture(dom: DocumentDomSource): DocumentDomSource

export function useCapture(dom: DomSource | DocumentDomSource) {
  return isDocumentDomSource(dom) ? useCaptureDocument(dom) : useCaptureDomSource(dom)
}

function isDocumentDomSource(dom: DomSource | DocumentDomSource): dom is DocumentDomSource {
  return dom.hasOwnProperty('document$')
}

function useCaptureDocument(documentDomSource: DocumentDomSource) {
  return new DocumentDomSource(documentDomSource.document$, { useCapture: true })
}

function useCaptureDomSource(dom: DomSource): DomSource {
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
