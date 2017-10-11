import { Stream } from '@motorcycle/types'
import { curry3 } from '167'
import { scan } from './scan'
import { skipRepeats } from './skipRepeats'
import { switchMap } from './switchMap'

/**
 * Especially useful when keeping local state that also needs to be updated
 * from an outside source.
 * @name state<A, B>(f: (acc: A, value: B) => A, seed$: Stream<A>, values$: Stream<B>): Stream<A>
 * @example 
 * import { Stream } from '@motorcycle/types'
 * import { query, dragOverEvent, dragstartEvent, dropEvent } from '@motorcycle/dom'
 * import { sample, map, state, mapList } from '@motorcycle/stream'
 * import { move } from '@typed/prelude'
 * 
 * export function ReorderableList(sources) {
 *   const { list$, dom } = sources
 *   const li = query('li', dom)
 *   const dragOver$ = dragOverEvent(li)
 *   const dragStart$ = dragstartEvent(li)
 *   const drop$ = dropEvent(li)
 *   const reducer$: Stream<(list: Array<string>) => Array<string>> = 
 *     sample((to, from) => move(from, to), map(getKey, drop$), map(getKey, dragStart$))
 *   const reorderedList$ = state((x, f) => f(x), list$, reducer$)
 *   // create all of our <li> tags
 *   const childViews$ = mapList(listItem, reorderedList$)
 *   // create our <ul> containgin our <li> tags
 *   const view$ = map(view, childViews$)
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
  return skipRepeats(switchMap(seed => scan(f, seed, values$), seed$))
}

export interface State {
  <A, B>(f: (accumulator: A, value: B) => A, seed$: Stream<A>, values$: Stream<B>): Stream<A>
  <A, B>(f: (accumulator: A, value: B) => A, seed$: Stream<A>): (values$: Stream<B>) => Stream<A>
  <A, B>(f: (accumulator: A, value: B) => A): {
    (seed$: Stream<A>, values$: Stream<B>): Stream<A>
    (seed$: Stream<A>): (values$: Stream<B>) => Stream<A>
  }
}
