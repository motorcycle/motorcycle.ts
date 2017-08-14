import { map, multicast, switchLatest } from '@motorcycle/stream'

import { EventStream } from './EventStream'
import { StandardEvents } from '../'
import { Stream } from '@motorcycle/types'

/**
 * Partial DomSource implementation
 * @name DocumentDomSource
 * @example
 * export class DocumentDomSource {
 *   constructor(document$: Stream<Document>, options?: EventListenerOptions)
 *   elements(): Stream<ReadonlyArray<Document>> // Always an Array with Document at index 0
 *   events<Ev extends Event>(type: StandardEvents, options?: EventListenerOptions): Stream<Ev>
 * }
 * @type
 */
export class DocumentDomSource {
  public document$: Stream<Document>
  private defaultOptions: EventListenerOptions

  constructor(document$: Stream<Document>, options = {}) {
    this.document$ = document$
    this.defaultOptions = options
  }

  public elements(): Stream<ReadonlyArray<Document>> {
    return map(Array, this.document$)
  }

  public events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options?: EventListenerOptions
  ): Stream<Ev> {
    const { document$ } = this

    const event$$ = map(
      document => new EventStream(eventType, document, options || this.defaultOptions),
      document$
    )

    return multicast(switchLatest(event$$))
  }
}
