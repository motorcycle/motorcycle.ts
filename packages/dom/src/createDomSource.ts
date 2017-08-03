import { DomSource } from './types'
import { EventDelegationDomSource } from './DomSources'
import { Stream } from '@motorcycle/types'

export function createDomSource(element$: Stream<Element>): DomSource {
  return new EventDelegationDomSource(element$, [])
}
