import { Sinks, Sources } from './types'
import { VNode, input } from '@motorcycle/mostly-dom'
import { events, query } from '@motorcycle/dom'
import { lensPath, pipe, view as viewLens } from '167'

import { debounce } from '@most/core'
import { map } from '@motorcycle/stream'

const searchInput = pipe(query('#search-input'), events('input'))
const eventTargetValue = map(viewLens(lensPath<Event, string>(['target', 'value'])))

const DEBOUNCE_TIME = 300

export function SearchInput(sources: Sources): Sinks {
  const { dom, query$ } = sources

  const value$ = debounce(DEBOUNCE_TIME, eventTargetValue(searchInput(dom)))
  const view$ = map(view, query$)

  return { view$, value$ }
}

function view(value: string = ''): VNode {
  return input({ id: 'search-input', type: 'search', value }, [])
}
