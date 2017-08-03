import { CssSelector, DomSource } from '../'

import { curry2 } from '167'

/**
 * A curried function for building more specific queries for elements.
 * 
 * @name query(cssSelector: CssSelector, domSource: DomSource): DomSource
 * @example 
 * import { DomSource, query, events } from '@motorcycle/dom'
 * 
 * type Sources = { dom: DomSource }
 * 
 * function Component(sources: Sources) {
 *   const { dom } = sources
 *
 *   const button: DomSource = query('button', dom)
 *   const event$ = events('click', button)
 * 
 *   ...
 * }
 */
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
