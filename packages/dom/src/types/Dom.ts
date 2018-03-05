import { StandardEventTypes } from './Events'
import { Stream } from '@motorcycle/types'

/**
 * A DOM interface for objects to declaratively query the DOM.
 *
 * @name Dom
 *
 * @example
 * interface Dom {
 *   query(c: CssSelector): Dom
 *   elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
 *   event<Ev extends Event = Event>(et: StandardEvents, o?: EventListenerOptions): Stream<Ev>
 *   cssSelectors(): ReadonlyArray<CssSelector>
 * }
 *
 * @type
 */
export interface Dom<A = Element, B = Event> {
  /**
   * Queries for elements and events for a specified CSS selector.
   *
   * @name Dom.query(c: CssSelector): Dom
   *
   * @example
   * const queriedDom = dom.query(`.myCssSelector`)
   */
  query<C extends A = A>(c: CssSelector): Dom<C, B>

  /**
   * Retrieves a stream of a list of elements matching previous queries.
   *
   * NOTE: Elements will emit every single time the DOM is updated.
   *
   * @name Dom.elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
   *
   * @example
   * const queriedDom = dom.query(`.myCssSelector`)
   * const elements$ = queriedDom.elements()
   */
  elements(): Stream<ReadonlyArray<A>>

  /**
   * Retrieves a stream of events from elements matching previous queries.
   * 
   * `Dom.event` optionally takes a second parameter of `EventListernerOptions`,
   * which specifies whether event listeners will listen to events during the 
   * capturing phase. If not provided, all event listeners will use bubbling phase.
   * 
   * @name Dom.event<Ev extends Event = Event>(et: StandardEvents, o?: EventListenerOptions): Stream<Ev>
   * @example
   * const queriedDom = dom.query(`.myCssSelector`)
   * const clicked$: Stream<MouseEvent> = queriedDom.event<MouseEvent>('click')
   */
  event<Ev extends B = B>(et: StandardEventTypes, o?: EventListenerOptions): Stream<Ev>

  /**
   * Retrieves a list of all previously queried CSS selectors.
   * 
   * @name Dom.cssSelectors(): ReadonlyArray<CssSelector>
   * @example
   * const queriedDom = dom.query(`.myCssSelector`)
   * const cssSelectors = queriedDom.cssSelectors()
   * 
   * console.log(cssSelectors[0]) // .myCssSelector
   */
  cssSelectors(): ReadonlyArray<CssSelector>
}

export type CssSelector = string
