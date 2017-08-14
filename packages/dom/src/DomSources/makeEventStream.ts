import { CssSelector, StandardEvents } from '../'
import { equals, length, not } from '167'
import { filter, map } from '@motorcycle/stream'

import { EventStream } from './EventStream'
import { Stream } from '@motorcycle/types'

export function makeEventStream<Ev extends Event = Event>(
  cssSelector: CssSelector,
  eventType: StandardEvents,
  options: EventListenerOptions = {}
) {
  return function(element: Element): Stream<Ev> {
    const { capture } = options

    const ensureEventMatches = filter((event: Event) =>
      ensureMatches(cssSelector, element, event, capture)
    )

    const event$ = ensureEventMatches(new EventStream<Ev>(eventType, element, options))

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
