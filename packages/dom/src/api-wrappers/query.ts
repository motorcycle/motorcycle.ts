import { CssSelector, DomSource } from '../'

import { curry2 } from '167'

/**
 * A curried function for building more specific queries for elements.
 * 
 * @name query<A, B, C>(cssSelector: CssSelector, domSource: DomSource<A, B>): DomSource<C, B>
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
export const query: Query = curry2(function queryWrapper<A = Element, B = Event, C extends A = A>(
  cssSelector: CssSelector,
  domSource: DomSource<A, B>
): DomSource<C, B> {
  return domSource.query<C>(cssSelector)
})

export interface Query {
  <A = Element, B = Event, C = Element>(
    cssSelector: CssSelector,
    domSource: DomSource<A, B>
  ): DomSource<C, B>
  <A = Element, B = Event, C = Element>(cssSelector: CssSelector): (
    domSource: DomSource<A, B>
  ) => DomSource<C, B>
  (cssSelector: CssSelector): <A = Element, B = Event, C = Element>(
    domSource: DomSource<A, B>
  ) => DomSource<C, B>
}
