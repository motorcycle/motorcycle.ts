import { Sinks, Sources } from './types'
import { combine, hold, now } from '@motorcycle/stream'

import { friends } from './friends'
import { saveQueryToHistory } from './saveQueryToHistory'
import { search } from '../domain/services'
import { toggle } from './toggle'

export function Application(sinks: Sinks): Sources {
  const { value$ } = sinks
  const allFriends$ = now(friends)
  const query$ = saveQueryToHistory(value$)
  const friends$ = hold(combine(search, query$, allFriends$))
  const isLoading$ = toggle(query$, friends$)

  return { friends$, isLoading$, query$ }
}
