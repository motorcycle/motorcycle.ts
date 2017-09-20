import { hold, map, merge, skipRepeats, startWith, tap } from '@motorcycle/stream'
import { pipe, prop, reduce, set } from '167'

import { Stream } from '@motorcycle/types'
import { popState } from './popState'

const QUERY_PARAM_NAME = 'q'

const saveQuery = pipe(skipRepeats, tap(pushQuery))
const retrieveStateOnPopstate = merge(map(retrieveCurrentState, popState()))
const startWithInitialState = startWith(retrieveCurrentState())

export const saveQueryToHistory = pipe<Stream<string>, Stream<string>>(
  saveQuery,
  retrieveStateOnPopstate,
  startWithInitialState,
  skipRepeats,
  hold
)

function pushQuery(value: string) {
  const pathName = value.trim() ? `/?${QUERY_PARAM_NAME}=${value.trim()}` : '/'

  history.pushState(null, null, pathName)
}

function retrieveCurrentState(): string {
  const { search } = location

  return prop(QUERY_PARAM_NAME, parseQueryString(search))
}

function parseQueryString(queryString: string): Queries {
  const queryStrings = queryString.substring(1).split('&')

  return reduce(setQueryValue, {}, queryStrings)
}

function setQueryValue(queries: Queries, query: string) {
  const [queryName, queryValue] = query.split('=')

  return set(queryName, queryValue, queries)
}

type Queries = Readonly<Record<string, string>>
