import { CssSelector, DomSource, StandardEvents } from '../'
import { map, multicast, switchLatest } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'

const DOCUMENT_CSS_SELECTORS: ReadonlyArray<CssSelector> = []

export class DocumentDomSource implements DomSource<Document, Event> {
  public document$: Stream<Document>

  constructor(document$: Stream<Document>) {
    this.document$ = document$
  }

  public query(): DomSource<Document, Event> {
    return this
  }

  public elements(): Stream<ReadonlyArray<Document>> {
    return map(Array, this.document$)
  }

  public events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options: EventListenerOptions = {}
  ): Stream<Ev> {
    const { document$ } = this

    const event$$ = map(document => new EventStream(eventType, document, options), document$)

    return multicast(switchLatest(event$$))
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return DOCUMENT_CSS_SELECTORS
  }
}
