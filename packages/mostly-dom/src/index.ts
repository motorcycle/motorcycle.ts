/**
 * Virtual DOM node type from mostly-dom
 * @name Types
 * @example
 * // All other types are used directly from mostly-dom
 * // https://github.com/TylorS167/mostly-dom
 * @type
 */

/**
 * DomSource type as defined by @motorcycle/dom
 * @name DomSource
 * @example
 * interface DomSource {
 *   query(cssSelector: CssSelector): DomSource
 *   elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
 *   events<Ev extends Event = Event>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>
 *   cssSelectors(): ReadonlyArray<CssSelector>
 * }
 * @type
 */

/**
 * Functions for describing your views.
 * Re-exported from [`mostly-dom`](https://github.com/TylorS167/mostly-dom)
 *
 * @name hyperscript-helpers
 * @example
 * import { VNode, div, h1, button } from '@motorcycle/mostly-dom'
 *
 * function view(amount: number): VNode {
 *   return div([
 *     h1(`Clicked ${amount} times!`),
 *     button('Click me')
 *   ])
 * }
 */
export * from 'mostly-dom'

export * from './isolate'
export * from './makeDomComponent'
