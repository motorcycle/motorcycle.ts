import { StandardEvents } from './Events'
import { Stream } from '@motorcycle/types'

/**
 * A DOM source interface for objects to declaratively query the DOM.
 *
 * @name DomSource
 *
 * @example
 * interface DomSource {
 *   query(cssSelector: CssSelector): DomSource
 *   elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
 *   events<Ev extends Event = Event>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>
 *   cssSelectors(): ReadonlyArray<CssSelector>
 * }
 *
 * @type
 */
export interface DomSource<A = Element, B = Event> {
  /**
   * Queries for elements and events for a specified CSS selector.
   *
   * @name DomSource.query(cssSelector: CssSelector): DomSource
   *
   * @example
   * const queriedDomSource = domSource.query(`.myCssSelector`)
   */
  query<C extends A = A>(cssSelector: CssSelector): DomSource<C, B>

  /**
   * Retrieves a stream of a list of elements matching previous queries.
   *
   * NOTE: Elements will emit every single time the DOM is updated.
   *
   * @name DomSource.elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
   *
   * @example
   * const queriedDomSource = domSource.query(`.myCssSelector`)
   * const elements$ = queriedDomSource.elements()
   */
  elements(): Stream<ReadonlyArray<A>>

  /**
   * Retrieves a stream of events from elements matching previous queries.
   * 
   * `DomSource.events` optionally takes a second parameter of `EventListernerOptions`,
   * which specifies whether event listeners will listen to events during the 
   * capturing phase. If not provided, all event listeners will use bubbling phase.
   * 
   * @name DomSource.events<Ev extends Event = Event>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>
   * @example
   * const queriedDomSource = domSource.query(`.myCssSelector`)
   * const clickEvent$: Stream<MouseEvent> = queriedDomSource.events<MouseEvent>('click')
   */
  events<Ev extends B = B>(eventType: StandardEvents, options?: EventListenerOptions): Stream<Ev>

  /**
   * Retrieves a list of all previously queried CSS selectors.
   * 
   * @name DomSource.cssSelectors(): ReadonlyArray<CssSelector>
   * @example
   * const queriedDomSource = domSource.query(`.myCssSelector`)
   * const cssSelectors = queriedDomSource.cssSelectors()
   * 
   * console.log(cssSelectors[0]) // .myCssSelector
   */
  cssSelectors(): ReadonlyArray<CssSelector>
}

export type CssSelector = string
