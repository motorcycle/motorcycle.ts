import { CssSelector, StandardEvents } from '../'
import { Disposable, Scheduler, Sink, Stream } from '@motorcycle/types'
import { equals, length, not } from '167'

import { map } from '@motorcycle/stream'

export function makeEventStream<Ev extends Event = Event>(
  cssSelector: CssSelector,
  eventType: StandardEvents,
  options: EventListenerOptions = {}
) {
  return function(element: Element): Stream<Ev> {
    const event$ = new EventStream<Ev>(eventType, element, options)

    if (options.capture) return map(findCurrentTarget(cssSelector, element), event$)

    return event$
  }
}

function findCurrentTarget(cssSelector: CssSelector, element: Element) {
  return function(event: Event): Event {
    const isCurrentTarget = not(cssSelector) || element.matches(cssSelector)

    if (isCurrentTarget) return cloneEvent(event, element)

    const nodes = element.querySelectorAll(cssSelector)

    for (let i = 0; i < length(nodes); ++i) {
      const node = nodes[i]
      const containsEventTarget = node.contains(event.target as Element)

      if (containsEventTarget) return cloneEvent(event, node)
    }

    return event
  }
}

const EVENT_PROPERTY_TO_REPLACE = 'currentTarget'

function cloneEvent(event: Event, currentTarget: Element): Event {
  return new Proxy(event, {
    get(target: Event, property: keyof Event) {
      return equals(property, EVENT_PROPERTY_TO_REPLACE) ? currentTarget : target[property]
    },
  })
}

class EventStream<Ev extends Event> implements Stream<Ev> {
  private eventType: StandardEvents
  private element: Element
  private options: EventListenerOptions

  constructor(eventType: StandardEvents, element: Element, options: EventListenerOptions) {
    this.eventType = eventType
    this.element = element
    this.options = options
  }

  public run(sink: Sink<Ev>, scheduler: Scheduler): Disposable {
    const { eventType, element, options: { capture } } = this

    const listener = (event: Ev) => sink.event(scheduler.now(), event)

    const dispose = () => element.removeEventListener(eventType, listener, capture)

    element.addEventListener(eventType, listener, capture)

    return { dispose }
  }
}
