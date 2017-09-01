import { Sinks, Sources } from './types'
import { combine, map, merge, now, startWith, tap } from '@motorcycle/stream'

import { events } from './events'
import { friends } from './friends'
import { search } from '../domain/services'
import { set } from '167'

export function Application(sinks: Sinks): Sources {
  const { value$ } = sinks

  const isLoading$ = now(false)
  const history$ = map(ev => ev.state.value, events('popstate', window))
  const query$ = startWith(retrieveCurrentState(), merge(history$, tap(saveQueryToState, value$)))
  const friends$ = combine(search, query$, now(friends))

  return { friends$, isLoading$, query$ }
}

function saveQueryToState(value: string) {
  const url = value ? '/?q=' + value : '/'

  history.pushState(null, null, url)
}

function retrieveCurrentState(): string {
  return parseQueryString(location.search)['q']
}

function parseQueryString(queryString: string): Queries {
  const queryStrings = queryString.substring(1).split('&')

  return queryStrings.reduce(function(queries: Queries, query: string) {
    const [queryName, queryValue] = query.split('=')

    return set(queryName, queryValue, queries)
  }, {})
}

type Queries = Readonly<Record<string, string>>
