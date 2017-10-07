import { Sinks, Sources } from './types'
import { dragOverEvent, dragstartEvent, dropEvent, query } from '@motorcycle/dom'
import { listItem, view } from './view'
import { map, sample, scan, switchMap } from '@motorcycle/stream'
import { map as mapList, move } from '@typed/prelude'

export function ReorderableList(sources: Sources): Sinks {
  const { list$, dom } = sources
  const li = query('li', dom)
  const dragOver$ = dragOverEvent(li)
  const dragStart$ = dragstartEvent(li)
  const drop$ = dropEvent(li)
  const reducer$ = sample((to, from) => move(from, to), map(getKey, drop$), map(getKey, dragStart$))
  const reorderedList$ = switchMap(list => scan((x, f) => f(x), list, reducer$), list$)
  const childViews$ = map(list => mapList(listItem, list), reorderedList$)

  const view$ = map(view, childViews$)

  return {
    view$,
    preventDefault$: dragOver$,
  }
}

function getKey(event: DragEvent): number {
  const { target } = event
  const { dataset: { key } } = target as HTMLElement

  return parseInt(key as string, 10)
}
