import { CssSelector, DomSource, StandardEvents } from '../'
import { map, multicast, switchLatest } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'

const WINDOW_CSS_SELECTORS: ReadonlyArray<CssSelector> = []

/**
 * Takes in `Stream<Window>` and produces a `WindowDomSource`.
 * `Stream<Document>` is required and allows for the developer to decide which
 * events cause the stream to emit.
 *
 * @name createWindowDomSource(window$: Stream<Window>): WindowDomSource
 * @example
 * import { createWindowDomSource } from '@motorcycle/dom'
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
 *   const window$ = constant(window, view$)
 *
 *   const { dom } = Dom({ view$ })
 *
 *   return {
 *     dom,
 *     window: createWindowDomSource(window$)
 *   }
 * }
 */
export class WindowDomSource implements DomSource<Window, Event> {
  public window$: Stream<Window>

  constructor(window$: Stream<Window>) {
    this.window$ = window$
  }

  public query(): DomSource<Window, Event> {
    return this
  }

  public elements(): Stream<ReadonlyArray<Window>> {
    return map(Array, this.window$)
  }

  public events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options: EventListenerOptions = {}
  ): Stream<Ev> {
    const { window$ } = this

    const event$$ = map(window => new EventStream(eventType, window, options), window$)

    return multicast(switchLatest(event$$))
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return WINDOW_CSS_SELECTORS
  }
}
