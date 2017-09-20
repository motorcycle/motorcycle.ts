import { Sinks, Sources } from './types'
import { VNode, input } from '@motorcycle/mostly-dom'
import { events, query } from '@motorcycle/dom'
import { lensPath, pipe, view as viewLens } from '167'

import { debounce } from '@most/core'
import { map } from '@motorcycle/stream'
import { searchInputClass } from './styles'

const searchInput = pipe(query(`.${searchInputClass}`), events('input'))
const eventTargetValue = map(viewLens(lensPath<Event, string>(['target', 'value'])))

const DEBOUNCE_TIME = 100

export function SearchInput(sources: Sources): Sinks {
  const { dom, query$ } = sources

  const value$ = debounce(DEBOUNCE_TIME, eventTargetValue(searchInput(dom)))
  const view$ = map(view, query$)

  return { view$, value$ }
}

function view(value: string = ''): VNode {
  return input({ className: searchInputClass, type: 'search', value })
}
