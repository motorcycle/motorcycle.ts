import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { Stream } from '@motorcycle/types'

export type Sources = DomSources & {
  readonly list$: Stream<Array<string>>
}

export type Sinks = DomSinks & {
  readonly preventDefault$: Stream<Event>
}
