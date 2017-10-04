import { DomSource } from './types'
import { Stream } from '@motorcycle/types'
import { WindowDomSource } from './DomSources'

export function createWindowDomSource(window$: Stream<Window>): DomSource<Window, Event> {
  return new WindowDomSource(window$)
}
