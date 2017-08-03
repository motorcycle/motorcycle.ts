import { DomSource } from '../types'
import { Stream } from '@motorcycle/types'

export function elements<El extends Element>(dom: DomSource): Stream<ReadonlyArray<El>> {
  return dom.elements<El>()
}
