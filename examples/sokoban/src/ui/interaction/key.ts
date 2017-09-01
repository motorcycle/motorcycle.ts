import { DomSource, events } from '@motorcycle/dom'

import { Stream } from '@motorcycle/types'
import { map } from '@motorcycle/stream'

export function key(document: DomSource<Document, Event>): Stream<string> {
  const keyDown$ = events('keydown', document) as Stream<KeyboardEvent>

  return map(({ key }: { key: string }) => key, keyDown$)
}
