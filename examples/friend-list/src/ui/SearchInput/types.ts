import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { Stream } from '@motorcycle/types'

export type Sinks = DomSinks & { readonly value$: Stream<string> }

export type Sources = DomSources & { readonly query$: Stream<string> }
