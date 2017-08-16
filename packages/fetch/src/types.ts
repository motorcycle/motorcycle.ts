import { Stream } from '@motorcycle/types'

export type FetchSinks = {
  readonly request$: Stream<FetchRequest>
}

export type FetchRequest = {
  readonly url: Url
  readonly options?: RequestInit
}

export type Url = string

export type FetchSources = {
  readonly response$: Stream<FetchResponse>
}

export interface FetchResponse extends Response {
  readonly request: FetchRequest
}
