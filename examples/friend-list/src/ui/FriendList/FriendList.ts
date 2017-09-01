import { Sinks, Sources } from './types'
import { combineObj, map } from '@motorcycle/stream'

import { SearchInput } from '../SearchInput'
import { view } from './view'

export function FriendList(sources: Sources): Sinks {
  const { friends$ } = sources

  const { view$: searchView$, value$ } = SearchInput(sources)

  const model$ = combineObj({
    searchView: searchView$,
    friends: friends$,
  })

  const view$ = map(view, model$)

  return { view$, value$ }
}
