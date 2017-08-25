import { CssSelector, DomSource, StandardEvents } from '../'
import { append, copy, dropLast, equals, gt, join, length, pipe, prepend } from '167'
import { filter, map, multicast, switchLatest } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { makeEventStream } from './makeEventStream'

const ROOT_CSS_SELECTOR: CssSelector = `:root`

const CSS_SELECTOR_SEPARATOR = ` `

export class EventDelegationDomSource<A extends Element = Element> implements DomSource<A, Event> {
  private _cssSelectors: ReadonlyArray<CssSelector>

  private element$: Stream<A>

  private eventMap: Map<StandardEvents, Stream<Event>>

  constructor(element$: Stream<A>, cssSelectors: ReadonlyArray<CssSelector>) {
    this.element$ = element$
    this._cssSelectors = cssSelectors
    this.eventMap = new Map()
  }

  public query<El extends Element = A>(cssSelector: CssSelector): DomSource<El, Event> {
    if (equals(cssSelector, ROOT_CSS_SELECTOR)) return this

    const { _cssSelectors, element$ } = this

    return new EventDelegationDomSource(
      map(findMostSpecificElement(_cssSelectors), element$),
      append(cssSelector, this._cssSelectors)
    )
  }

  public elements<El extends Element = A>(): Stream<ReadonlyArray<El>> {
    const cssSelectors = this._cssSelectors
    const hasNoCssSelectors = equals(0, length(cssSelectors))

    if (hasNoCssSelectors) return map(Array, this.element$)

    const elements$ = map(findMatchingElements(cssSelectors), this.element$)
    const hasElements = pipe(length, gt(0))

    return filter(hasElements, elements$)
  }

  public events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options?: EventListenerOptions
  ): Stream<Ev> {
    const { eventMap, _cssSelectors, element$ } = this

    if (eventMap.has(eventType)) return eventMap.get(eventType) as Stream<Ev>

    const createEventStream = pipe(
      map(makeEventStream<Ev>(_cssSelectors, eventType, options)),
      switchLatest,
      multicast
    )
    const event$ = createEventStream(element$)

    eventMap.set(eventType, event$)

    return event$
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cssSelectors
  }
}

function findMostSpecificElement(cssSelectors: ReadonlyArray<CssSelector>) {
  return function(element: Element): Element {
    for (let i = 0; i < cssSelectors.length; ++i) {
      const cssSelector = join(CSS_SELECTOR_SEPARATOR, dropLast(i, cssSelectors))
      const node = element.querySelector(cssSelector)

      if (node) return node
    }

    return element
  }
}

function findMatchingElements<El extends Element = Element>(
  cssSelectors: ReadonlyArray<CssSelector>
) {
  const cssSelector = join(CSS_SELECTOR_SEPARATOR, cssSelectors)
  return function(element: El): ReadonlyArray<El> {
    const nodes = copy(element.querySelectorAll(cssSelector) as NodeListOf<El>)

    if (element.matches(cssSelector)) return prepend(element, nodes)

    return nodes
  }
}
