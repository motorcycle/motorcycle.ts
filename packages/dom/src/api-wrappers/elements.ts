import { Dom } from '../'
import { Stream } from '@motorcycle/types'

export interface ElementsFn {
  <A = Element, B = Event>(d: Dom<A, B>): Stream<ReadonlyArray<A>>
}

/**
 * Takes a Dom and returns a stream of Array of elements matches previous queries.
 * 
 * @name elements<A = Element, B = Event>>(d: Dom<A, B>): Stream<ReadonlyArray<A>>
 * @example
 * import { Dom, elements } from '@motorcycle/dom'
 * 
 * type Sources = { dom: Dom } 
 * 
 * function component(ss: Sources) {
 *   const { dom } = ss
 * 
 *   const elements$ = elements(dom)
 * 
 *   ...
 * }
 */
export const elements: ElementsFn = <A = Element, B = Event>(d: Dom<A, B>) => d.elements()
