import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { Stream } from '@motorcycle/types'

/**
 * @name HtmlSinks
 * @example
 * export type HtmlSinks = {
 *   readonly view$: Stream<VNode>
 * }
 * @type
 */
export type HtmlSinks = DomSinks

/**
 * @name
 * @example
 * export type HtmlSources<A = Element, B = Event> = {
 *   readonly html$: Stream<HtmlString>
 *   readonly dom: DomSource<A, B>
 * }
 * @type
 */
export type HtmlSources<A = Element, B = Event> = DomSources<A, B> & {
  readonly html$: Stream<string>
}
