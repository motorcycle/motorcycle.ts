import { FetchRequest, FetchResponse, FetchSinks, FetchSources } from './types'
import { chain, fromPromise, multicast } from '@motorcycle/stream'
import { pipe, set } from '167'

export function Fetch(sinks: FetchSinks): FetchSources {
  const { request$ } = sinks

  return { response$: multicast(makeRequest(request$)) }
}

const makeRequest = chain(pipe(makeFetchRequest, fromPromise))

function makeFetchRequest(request: FetchRequest): Promise<FetchResponse> {
  const { url, options } = request

  return fetch(url, options).then(set<FetchResponse>('request', request))
}
