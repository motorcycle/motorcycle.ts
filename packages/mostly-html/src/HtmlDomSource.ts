import { CssSelector, DomSource } from '@motorcycle/dom'

import { Stream } from '@motorcycle/types'
import { empty } from '@motorcycle/stream'

const ROOT_SELECTOR = ':root'

export class HtmlDomSource<A = Element, B = Event> implements DomSource<A, B> {
  public cssSelectors: () => ReadonlyArray<CssSelector>

  constructor(cssSelectors: ReadonlyArray<CssSelector>) {
    this.cssSelectors = () => cssSelectors
  }

  public query(cssSelector: CssSelector): DomSource<A, B> {
    const trimmedSelector = cssSelector.trim()

    return trimmedSelector === ROOT_SELECTOR
      ? this
      : new HtmlDomSource(this.cssSelectors().concat(trimmedSelector))
  }

  public events(): Stream<B> {
    return empty()
  }

  public elements(): Stream<ReadonlyArray<A>> {
    return empty()
  }
}
