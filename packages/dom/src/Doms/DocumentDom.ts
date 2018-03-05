import { CssSelector, Dom, StandardEventTypes } from '../'
import { map, multicast, switchLatest } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'

export class DocumentDom implements Dom<Document, Event> {
  public d$: Stream<Document>

  constructor(d$: Stream<Document>) {
    this.d$ = d$
  }

  public query(): Dom<Document, Event> {
    return this
  }

  public elements(): Stream<ReadonlyArray<Document>> {
    return map<Document, ReadonlyArray<Document>>(Array, this.d$)
  }

  public event<Ev extends Event = Event>(
    et: StandardEventTypes,
    o: EventListenerOptions = {}
  ): Stream<Ev> {
    const ev$$ = map(document => new EventStream(et, document, o), this.d$)

    return multicast(switchLatest(ev$$))
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return []
  }
}
