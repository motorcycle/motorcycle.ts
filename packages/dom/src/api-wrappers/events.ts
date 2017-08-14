import { DocumentDomSource, DomSource, StandardEvents } from '../'

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
export const events: Events = curry2(function<Ev extends Event>(
  eventType: StandardEvents,
  dom: DomSource
): Stream<Ev> {
  return dom.events(eventType)
})

export interface Events {
  <Ev extends Event = Event>(eventType: StandardEvents, dom: DomSource): Stream<Ev>
  <Ev extends Event = Event>(eventType: StandardEvents): (dom: DomSource) => Stream<Ev>
  (eventType: StandardEvents): <Ev extends Event = Event>(dom: DomSource) => Stream<Ev>

  <Ev extends Event = Event>(eventType: StandardEvents, dom: DocumentDomSource): Stream<Ev>
  <Ev extends Event = Event>(eventType: StandardEvents): (dom: DocumentDomSource) => Stream<Ev>
  (eventType: StandardEvents): <Ev extends Event = Event>(dom: DocumentDomSource) => Stream<Ev>
}
