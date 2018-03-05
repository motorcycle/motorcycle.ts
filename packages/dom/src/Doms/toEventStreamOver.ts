import { CssSelector, StandardEventTypes } from '../'
import { anyPass, equals, not } from '@typed/logic'
import { filter, map } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'
import { length } from '@typed/list'

export function toEventStreamOver<Ev extends Event = Event>(
  cs: ReadonlyArray<CssSelector>,
  ev: StandardEventTypes,
  o: EventListenerOptions = {}
) {
  return function(el: Element): Stream<Ev> {
    const { capture } = o

    const c = cs.join(' ')
    const lastTwoCssSelectors = cs.slice(-2).join('')

    const ensureEventMatches = filter(
      anyPass([
        (ev: Event) => ensureMatches(c, el, ev, capture),
        (ev: Event) => ensureMatches(lastTwoCssSelectors, el, ev, capture),
      ])
    )

    const ev$ = ensureEventMatches(new EventStream<Ev>(ev, el, o))

    if (capture) return map(findCurrentTargetOver(c, el), ev$)

    return ev$
  }
}

function findCurrentTargetOver(c: CssSelector, el: Element) {
  return function(ev: Event): Event {
    const isCurrentTarget = not(c) || el.matches(c)

    if (isCurrentTarget) return cloneEvent(ev, el)

    const matchedEls = el.querySelectorAll(c)

    for (let i = 0; i < length(matchedEls); ++i) {
      const mel = matchedEls[i]
      const containsEventTarget = mel.contains(ev.target as Element)

      if (containsEventTarget) return cloneEvent(ev, mel)
    }

    return ev
  }
}

const EVENT_PROPERTY_TO_REPLACE = 'currentTarget'

function cloneEvent(ev: Event, el: Element): Event {
  return new Proxy(ev, {
    get(target: Event, k: keyof Event) {
      return equals(k, EVENT_PROPERTY_TO_REPLACE) ? el : target[k]
    },
  })
}

function ensureMatches(c: CssSelector, el: Element, ev: Event, capture: boolean = false): boolean {
  let t = ev.target as Element

  if (!c) return (capture && el.contains(t)) || t === el

  for (; t && t !== el; t = t.parentElement as Element) if (t.matches(c)) return true

  return el.matches(c)
}
