import { CssSelector, Dom } from '@motorcycle/dom'

import { Stream } from '@motorcycle/types'
import { empty } from '@motorcycle/stream'

const ROOT_SELECTOR = ':root'

export class HtmlDom<A = Element, B = Event> implements Dom<A, B> {
  public cssSelectors: () => ReadonlyArray<CssSelector>

  constructor(cs: ReadonlyArray<CssSelector>) {
    this.cssSelectors = () => cs
  }

  public query(c: CssSelector): Dom<A, B> {
    const tc = c.trim()

    return tc === ROOT_SELECTOR ? this : new HtmlDom(this.cssSelectors().concat(tc))
  }

  public event(): Stream<B> {
    return empty()
  }

  public elements(): Stream<ReadonlyArray<A>> {
    return empty()
  }
}
