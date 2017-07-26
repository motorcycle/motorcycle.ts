import { CssSelector, DomSource } from '../'
import { append, copy, equals, gt, join, length, pipe, prepend } from '167'
import { empty, filter, map } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

const ROOT_CSS_SELECTOR: CssSelector = `:root`

const CSS_SELECTOR_JOINT = ` `

export class EventDelegationDomSource implements DomSource {
  private _cssSelectors: ReadonlyArray<CssSelector>

  private _element$: Stream<Element>

  constructor(element$: Stream<Element>, cssSelectors: ReadonlyArray<CssSelector>) {
    this._element$ = element$
    this._cssSelectors = cssSelectors
  }

  public query(cssSelector: CssSelector): DomSource {
    if (equals(cssSelector, ROOT_CSS_SELECTOR)) return this

    return new EventDelegationDomSource(empty(), append(cssSelector, this._cssSelectors))
  }

  public elements<El extends Element = Element>(): Stream<ReadonlyArray<El>> {
    const cssSelectors = this._cssSelectors

    if (equals(0, length(cssSelectors))) return map(Array, this._element$)

    const hasElements = pipe(length, gt(0))
    const cssSelector = join(CSS_SELECTOR_JOINT, cssSelectors)

    return filter(hasElements, map(findMatchingElements(cssSelector), this._element$))
  }

  public events<Ev extends Event = Event>(): Stream<Ev> {
    return empty()
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cssSelectors
  }
}

function findMatchingElements<El extends Element = Element>(cssSelector: CssSelector) {
  return function(element: El): ReadonlyArray<El> {
    const nodes = copy(element.querySelectorAll(cssSelector) as NodeListOf<El>)

    if (element.matches(cssSelector)) return prepend(element, nodes)

    return nodes
  }
}
