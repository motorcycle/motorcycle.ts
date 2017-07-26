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
 *   events<Ev extends Event = Event>(eventType: StandardEvents, options?: AddEventListenerOptions): Stream<Ev>
 *   cssSelectors(): ReadonlyArray<CssSelector>
 * }
 *
 * @type
 */
export interface DomSource {
  /**
   * Queries for elements and events for a specified CSS selector.
   *
   * @name DomSource.query(cssSelector: CssSelector): DomSource
   *
   * @example
   * const queriedDomSource = domSource.query(`.myCssSelector`)
   */
  query(cssSelector: CssSelector): DomSource

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
  elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>

  events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options?: AddEventListenerOptions
  ): Stream<Ev>
  cssSelectors(): ReadonlyArray<CssSelector>
}

export type CssSelector = string
