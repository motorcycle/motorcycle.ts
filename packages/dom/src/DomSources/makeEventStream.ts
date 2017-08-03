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
    const event$ = new EventStream<Ev>(cssSelector, eventType, element, options)

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
  private cssSelector: CssSelector
  private eventType: StandardEvents
  private element: Element
  private options: EventListenerOptions

  constructor(
    cssSelector: string,
    eventType: StandardEvents,
    element: Element,
    options: EventListenerOptions
  ) {
    this.cssSelector = cssSelector
    this.eventType = eventType
    this.element = element
    this.options = options
  }

  public run(sink: Sink<Ev>, scheduler: Scheduler): Disposable {
    const { cssSelector, eventType, element, options: { capture } } = this

    const listener = (event: Ev) =>
      ensureMatches(cssSelector, element, event, capture) && sink.event(scheduler.now(), event)

    const dispose = () => element.removeEventListener(eventType, listener, capture)

    element.addEventListener(eventType, listener, capture)

    return { dispose }
  }
}

function ensureMatches(
  cssSelector: CssSelector,
  element: Element,
  ev: Event,
  capture: boolean = false
): boolean {
  let target = ev.target as Element

  if (!cssSelector) return (capture && element.contains(target)) || target === element

  for (; target && target !== element; target = target.parentElement as Element)
    if (target.matches(cssSelector)) return true

  return element.matches(cssSelector)
}
