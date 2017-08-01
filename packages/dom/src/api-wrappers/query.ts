import { CssSelector, DomSource } from '../'

import { curry2 } from '167'

export const query: Query = curry2(function queryWrapper(
  cssSelector: CssSelector,
  domSource: DomSource
) {
  return domSource.query(cssSelector)
})

export interface Query {
  (cssSelector: CssSelector, domSource: DomSource): DomSource
  (cssSelector: CssSelector): (domSource: DomSource) => DomSource
}
