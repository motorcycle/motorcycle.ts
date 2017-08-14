import { DomSource, StandardEvents } from '../'

import { Stream } from '@motorcycle/types'
import { curry2 } from '167'

/**
 * Takes an event type and a DomSource and returns a stream of events.
 * 
 * @name event<Ev extends Event>(type: StandardEvents, dom: DomSource): Stream<Ev>
 * @example
 * import { events } from '@motorcycle/dom'
 * 
 * const click$ = events('click', dom)
 */
export const events: Events = curry2(function<A = Element, B = Event>(
  eventType: StandardEvents,
  dom: DomSource<A, B>
): Stream<B> {
  return dom.events<B>(eventType)
})

export interface Events {
  <A = Element, B = Event>(eventType: StandardEvents, dom: DomSource<A, B>): Stream<B>
  <A = Element, B = Event>(eventType: StandardEvents): (dom: DomSource<A, B>) => Stream<B>
  (eventType: StandardEvents): <A = Element, B = Event>(dom: DomSource<A, B>) => Stream<B>
}
