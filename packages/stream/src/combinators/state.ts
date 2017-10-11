import { Stream } from '@motorcycle/types'
import { curry3 } from '167'
import { hold } from './hold'
import { scan } from './scan'
import { skipRepeats } from './skipRepeats'
import { switchMap } from './switchMap'

/**
 * Especially useful when keeping local state that also needs to be updated
 * from a source.
 * @name state<A, B>(f: (acc: A, value: B) => A, seed$: Stream<A>, values$: Stream<B>): Stream<A>
 * @example
 * import { Stream } from '@motorcycle/types'
 * import { query, dragOverEvent, dragStartEvent, dropEvent } from '@motorcycle/dom'
 * import { sample, map, state, mapList } from '@motorcycle/stream'
 * import { move } from '@typed/prelude'
 *
 * export function ReorderableList(sources) {
 *   const { list$, dom } = sources
 *   const listItemSource = query(listItemCssSelector, dom)
 *   const dragOver$ = dragOverEvent(listItemSource)
 *   const dragStart$ = dragStartEvent(listItemSource)
 *   const drop$ = dropEvent(listItemSource)
 *   const reducer$: Stream<(list: Array<string>) => Array<string>> =
 *     sample((to, from) => move(from, to), map(elementDataKey, drop$), map(elementDataKey, dragStart$))
 *   const reorderedList$ = state((x, f) => f(x), list$, reducer$)
 *   // Create all list items.
 *   const listItemViews$ = mapList(listItem, reorderedList$)
 *   // Pass the list items to the view
 *   const view$ = map(view, listItemViews$)
 *
 *   return {
 *     view$,
 *     preventDefault$: dragOver$,
 *   }
 * }
 */
export const state: State = curry3(__state)

function __state<A, B>(
  f: (accumulator: B, value: A) => B,
  seed$: Stream<B>,
  values$: Stream<A>
): Stream<B> {
  return hold(skipRepeats(switchMap(seed => scan(f, seed, values$), seed$)))
}

export interface State {
  <A, B>(f: (accumulator: A, value: B) => A, seed$: Stream<A>, values$: Stream<B>): Stream<A>
  <A, B>(f: (accumulator: A, value: B) => A, seed$: Stream<A>): (values$: Stream<B>) => Stream<A>
  <A, B>(f: (accumulator: A, value: B) => A): {
    (seed$: Stream<A>, values$: Stream<B>): Stream<A>
    (seed$: Stream<A>): (values$: Stream<B>) => Stream<A>
  }
}
