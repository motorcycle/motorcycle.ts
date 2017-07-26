import { CssSelector, DomSource } from '../'
import { append, equals } from '167'

import { Stream } from '@motorcycle/types'
import { empty } from '@motorcycle/stream'

const ROOT_CSS_SELECTOR: CssSelector = `:root`

export class EventDelegationDomSource implements DomSource {
  private _cssSelectors: ReadonlyArray<CssSelector>

  constructor(element$: Stream<Element>, cssSelectors: ReadonlyArray<CssSelector>) {
    Function.prototype(element$)

    this._cssSelectors = cssSelectors
  }

  public query(cssSelector: CssSelector): DomSource {
    if (equals(cssSelector, ROOT_CSS_SELECTOR)) return this

    return new EventDelegationDomSource(empty(), append(cssSelector, this._cssSelectors))
  }

  public elements<El extends Element = Element>(): Stream<ReadonlyArray<El>> {
    return empty()
  }

  public events<Ev extends Event = Event>(): Stream<Ev> {
    return empty()
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return this._cssSelectors
  }
}
