import { DomSource, StandardEvents } from '../types'

import { Stream } from '@motorcycle/types'
import { curry2 } from '167'

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
}
