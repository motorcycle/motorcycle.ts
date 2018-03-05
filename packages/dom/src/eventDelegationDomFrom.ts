import { EventDelegationDom } from './Doms'
import { Stream } from '@motorcycle/types'

export interface EventDelegationDomFrom {
  (el$: Stream<Element>): EventDelegationDom
}

/**
 * Takes a stream of DOM Elements an returns an EventDelegationDom.
 * 
 * @name createDomSource(element$: Stream<Element>): EventDelegationDom
 * @example
 * import { eventDelegationDomFrom } from '@motorcycle/dom'
 * 
 * const dom = eventDelegationDomFrom(element$)
 */
export const eventDelegationDomFrom: EventDelegationDomFrom = (el$: Stream<Element>) =>
  new EventDelegationDom(el$, [])
