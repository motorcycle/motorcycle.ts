import { Stream } from '@motorcycle/types'
import { WindowDom } from './Doms'

/**
 * `WindowDomFrom` function interface.
 * 
 * @name WindowDomFrom
 * @example
 * export interface WindowDomFrom {
 *   (w$: Stream<Window>): WindowDom
 * }
 * @type true
 */
export interface WindowDomFrom {
  (w$: Stream<Window>): WindowDom
}

/**
 * Takes a `Stream<Window>` and produces a `WindowDom`.
 * `Stream<Window>` is required and allows for the developer to decide which
 * events cause the stream to emit.
 *
 * @name windowDomFrom(w$: Stream<Window>): WindowDom
 * @example
 * import { windowDomFrom } from '@motorcycle/dom'
 * import { makeDomComponent } from '@motorcycle/mostly-dom'
 * import { constant } from '@motorcycle/stream'
 * import { UI } from './UI'
 *
 * const element = document.querySelector('#app-container') as Element
 * const Dom = makeDomComponent(element)
 *
 * function dialogue(rs) {
 *   const { view$ } = rs
 *   const w$ = constant(window, view$)
 *   const { dom } = Dom({ view$ })
 *
 *   return {
 *     dom,
 *     windowDom: windowDomFrom(w$)
 *   }
 * }
 */
export const windowDomFrom: WindowDomFrom = (w$: Stream<Window>) => new WindowDom(w$)
