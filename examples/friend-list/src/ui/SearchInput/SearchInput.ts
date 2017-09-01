import { Sinks, Sources } from './types'
import { VNode, input } from '@motorcycle/mostly-dom'
import { events, query } from '@motorcycle/dom'
import { lensPath, pipe, view } from '167'
import { map, merge } from '@motorcycle/stream'

import { debounce } from '@most/core'

const searchInput = pipe(query('#search-input'), events('input'))
const eventTargetValue = map(view(lensPath<Event, string>(['target', 'value'])))

const DEBOUNCE_TIME = 100

export function SearchInput(sources: Sources): Sinks {
  const { dom, query$ } = sources

  const value$ = debounce(DEBOUNCE_TIME, eventTargetValue(searchInput(dom)))
  const view$ = map(render, merge(value$, query$))

  return { view$, value$ }
}

function render(value: string = ''): VNode {
  return input({ id: 'search-input', type: 'search', value, attrs: { value } }, [])
}
