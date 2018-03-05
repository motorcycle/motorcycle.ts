import { Dialogue, Requests, Responses, Stream } from '@motorcycle/types'
import { Dom, eventDelegationDomFrom } from '@motorcycle/dom'
import { ElementVNode, VNode, elementToVNode, init } from 'mostly-dom'
import { drain, hold, map, scan } from '@motorcycle/stream'

import { prop } from '@typed/objects'
import { vNodeWrapper } from './vNodeWrapper'

/**
 * Requests type returns by a DOM dialogue.
 * 
 * @name DomSinks
 * @example
 * export interface DomRequests extends Requests {
 *   readonly view$: Stream<VNode>
 * }
 * @type
 */
export interface DomRequests extends Requests {
  readonly view$: Stream<VNode>
}

/**
 * Responses type expected by a DOM dialogue.
 * 
 * @name DomResponses
 * @example
 * export interface DomRequests<A = Element, B = Event> extends Requests {
 *   readonly dom: Dom<A, B>
 * }
 * @type
 */
export interface DomResponses<A = Element, B = Event> extends Responses {
  readonly dom: Dom<A, B>
}

export interface DomDialogueOver {
  (el: Element): Dialogue<DomRequests, DomResponses>
}

const toElement = map(prop<ElementVNode, 'element'>('element'))

/**
 * Takes an `Element` and returns a DOM `Dialogue` function.
 *
 * @name domDialogueOver(el: Element): Dialogue<DomRequests, DomResponses>
 * @example
 * import {
 *   domDialogueOver,
 *   DomResponses,
 *   DomRequests,
 *   VNode,
 *   events,
 *   query,
 *   div,
 *   h1,
 *   button
 * } from '@motorcycle/mostly-dom'
 * import { run } from '@motorcycle/run'
 *
 * const element = document.querySelector('#app')
 *
 * if (!element) throw new Error('unable to find element')
 *
 * run(Main, domDialogueOver(element))
 *
 * function Main(rs: DomResponses): DomRequests {
 *   const { dom } = rs
 *   const click$: Stream<Event> = events('click', query('button'))
 *   const amount$: Stream<number> = scan(x => x + 1, 0, click$)
 *   const view$: Stream<VNode> = map(view, amount$)
 *
 *   return { view$ }
 * }
 *
 * function view(amount: number) {
 *   return div([
 *     h1(`Clicked ${amount} times`),
 *     button(`Click me`)
 *   ])
 * }
 */
export const domDialogueOver: DomDialogueOver = function(el: Element) {
  const rootVNode = elementToVNode(el)
  const wrapVNode = map(vNodeWrapper(el))
  const patch = scan(init(), rootVNode)

  const domDialogue: Dialogue<DomRequests, DomResponses> = function Dom({
    view$,
  }: DomRequests): DomResponses {
    const vn$ = patch(wrapVNode(view$))
    const el$ = hold(toElement(vn$))
    const dom = eventDelegationDomFrom(el$)

    drain(el$)

    return { dom }
  }

  return domDialogue
}
