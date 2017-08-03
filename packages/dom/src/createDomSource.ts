import { DomSource } from './types'
import { EventDelegationDomSource } from './DomSources'
import { Stream } from '@motorcycle/types'

/**
 * Takes a stream of DOM Elements an returns a DomSource. This DomSource
 * makes use of event delegation. 
 * 
 * @name createDomSource(element$: Stream<Element>): DomSource
 * @example
 * import { createDomSource } from '@motorcycle/dom'
 * 
 * const dom = createDomSource(element$)
 */
export function createDomSource(element$: Stream<Element>): DomSource {
  return new EventDelegationDomSource(element$, [])
}
