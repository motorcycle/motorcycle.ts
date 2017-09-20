import { Friends } from '../domain/model'
import { Stream } from '@motorcycle/types'

export * from '../domain/model/types'

export type Sources = {
  readonly friends$: Stream<Friends>
  readonly isLoading$: Stream<boolean>
  readonly query$: Stream<string>
}

export type Sinks = {
  readonly value$: Stream<string>
}
