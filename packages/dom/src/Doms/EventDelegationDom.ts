import { CssSelector, Dom, StandardEventTypes } from '../'
import { append, dropLast, join, length, prepend } from '@typed/list'
import { equals, greaterThan } from '@typed/logic'
import { filter, map, multicast, switchLatest } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { pipe } from '@typed/functions'
import { toEventStreamOver } from './toEventStreamOver'

const ROOT_CSS_SELECTOR: CssSelector = ':root'

const CSS_SELECTOR_SEPARATOR = ' '

export class EventDelegationDom<A extends Element = Element> implements Dom<A, Event> {
  private _cs: ReadonlyArray<CssSelector>

  private _el$: Stream<A>

  private _ev$s: Map<StandardEventTypes, Stream<Event>>

  constructor(el$: Stream<A>, cs: ReadonlyArray<CssSelector>) {
    this._el$ = el$
    this._cs = cs
    this._ev$s = new Map()
  }

  public query<El extends Element = A>(c: CssSelector): Dom<El, Event> {
    if (equals(c, ROOT_CSS_SELECTOR)) return this

    const { _cs, _el$ } = this

    return new EventDelegationDom(map(findMostSpecificElementOver(_cs), _el$), append(c, this._cs))
  }

  public elements<El extends Element = A>(): Stream<ReadonlyArray<El>> {
    const { _cs, _el$ } = this
    const hasNoCssSelectors = equals(0, length(_cs))

    if (hasNoCssSelectors) return map<A, ReadonlyArray<El>>(Array, _el$)

    const el$ = map(findMatchingElementsOver(_cs), _el$)
    const hasElements = pipe(length, greaterThan(0))

    return filter(hasElements, el$)
  }

  public event<Ev extends Event = Event>(
    et: StandardEventTypes,
    o?: EventListenerOptions
  ): Stream<Ev> {
    const { _ev$s, _cs, _el$ } = this

    if (_ev$s.has(et)) return _ev$s.get(et) as Stream<Ev>

    const f = pipe(map(toEventStreamOver<Ev>(_cs, et, o)), switchLatest, multicast)
    const ev$ = f(_el$)

    _ev$s.set(et, ev$)

    return ev$
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cs
  }
}

function findMostSpecificElementOver(cs: ReadonlyArray<CssSelector>) {
  return function(el: Element): Element {
    for (let i = 0; i < cs.length; ++i) {
      const c = join(CSS_SELECTOR_SEPARATOR, dropLast(i, cs))
      const matchedEl = el.querySelector(c)

      if (matchedEl) return matchedEl
    }

    return el
  }
}

function findMatchingElementsOver<El extends Element = Element>(cs: ReadonlyArray<CssSelector>) {
  const c = join(CSS_SELECTOR_SEPARATOR, cs)
  return function(el: El): ReadonlyArray<El> {
    const matchedEls = (el.querySelectorAll(c) as any) as ArrayLike<El>

    if (el.matches(c)) return (prepend(el, matchedEls) as any) as ReadonlyArray<El>

    return Array.from(matchedEls)
  }
}
