import { CssSelector, StandardEvents } from '../'
import { anyPass, equals, length, not } from '@typed/prelude'
import { filter, map } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'

export function makeEventStream<Ev extends Event = Event>(
  cssSelectors: ReadonlyArray<CssSelector>,
  eventType: StandardEvents,
  options: EventListenerOptions = {}
) {
  return function(element: Element): Stream<Ev> {
    const { capture } = options

    const cssSelector = cssSelectors.join(' ')
    const lastTwoCssSelectors = cssSelectors.slice(-2).join('')

    const ensureEventMatches = filter(
      anyPass([
        (event: Event) => ensureMatches(cssSelector, element, event, capture),
        (event: Event) => ensureMatches(lastTwoCssSelectors, element, event, capture),
      ])
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
