import { DomSource, createDomSource } from '@motorcycle/dom'
import { ElementVNode, VNode, elementToVNode, init } from 'mostly-dom'
import { IOComponent, Stream } from '@motorcycle/types'
import { drain, hold, map, scan } from '@motorcycle/stream'

import { prop } from '167'
import { vNodeWrapper } from './vNodeWrapper'

/**
 * Sources type expected by a DOM component.
 * @name DomSources
 * @example
 * export type DomSources<A = Element, B = Event> = { readonly dom: DomSource<A, B> }
 * @type
 */
export type DomSources<A = Element, B = Event> = { readonly dom: DomSource<A, B> }

/**
 * Sinks type returns by a DOM component.
 * @name DomSinks
 * @example
 * export type DomSinks = { readonly view$: Stream<VNode> }
 * @type
 */
export type DomSinks = { readonly view$: Stream<VNode> }

const toElement = map(prop<ElementVNode>('element'))

/**
 * Takes an element and returns a DOM component function.
 *
 * @name makeDomComponent(element: Element): (sinks: DomSinks) => DomSources
 * @example
 * import {
 *   makeDomComponent,
 *   DomSources,
 *   DomSinks,
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
 * run(Main, makeDomComponent(element))
 *
 * function Main(sources: DomSources): DomSinks {
 *   const { dom } = sources
 *
 *   const click$: Stream<Event> = events('click', query('button'))
 *
 *   const amount$: Stream<number> = scan(x => x + 1, 0, click$)
 *
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
export function makeDomComponent(element: Element): IOComponent<DomSinks, DomSources> {
  const rootVNode = elementToVNode(element)
  const wrapVNode = map(vNodeWrapper(element))
  const patch = scan(init(), rootVNode)

  return function Dom(sinks: DomSinks): DomSources {
    const { view$ } = sinks

    const elementVNode$ = patch(wrapVNode(view$))
    const element$ = hold(toElement(elementVNode$))
    const dom = createDomSource(element$)

    drain(element$)

    return { dom }
  }
}
