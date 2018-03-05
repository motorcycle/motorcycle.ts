import { CssSelector, Dom } from '../'

import { curry2 } from '@typed/prelude'

/**
 * A curried function for building more specific queries for elements.
 * 
 * @name query<A, B, C>(c: CssSelector, d: DomSource<A, B>): Dom<C, B>
 * @example 
 * import { Dom, query, event } from '@motorcycle/dom'
 * 
 * type Sources = { dom: Dom }
 * 
 * function component(ss: Sources) {
 *   const { dom } = ss
 *
 *   const button: Dom = query('button', dom)
 *   const event$ = event('click', button)
 * 
 *   ...
 * }
 */
export const query: Query = curry2(function queryWrapper<A = Element, B = Event, C extends A = A>(
  c: CssSelector,
  d: Dom<A, B>
): Dom<C, B> {
  return d.query<C>(c)
})

export interface Query {
  <A = Element, B = Event, C = Element>(c: CssSelector, d: Dom<A, B>): Dom<C, B>
  <A = Element, B = Event, C = Element>(c: CssSelector): (d: Dom<A, B>) => Dom<C, B>
  (c: CssSelector): <A = Element, B = Event, C = Element>(d: Dom<A, B>) => Dom<C, B>
}
