import { Dialogue, Stream } from '@motorcycle/types'
import { DomRequests, DomResponses } from '@motorcycle/mostly-dom'
import { hold, map } from '@motorcycle/stream'

import { HtmlDom } from './HtmlDom'
import { toHtml } from 'mostly-html'

/**
 * @name HtmlRequests
 * @example
 * export interface HtmlRequests extends DomRequests {
 *   readonly view$: Stream<VNode>
 * }
 * @type
 */
export interface HtmlRequests extends DomRequests {}

/**
 * @name
 * @example
 * export type HtmlSources<A = Element, B = Event> = {
 *   readonly html$: Stream<string>
 *   readonly dom: Dom<A, B>
 * }
 * @type
 */
export interface HtmlResponses<A = Element, B = Event> extends DomResponses<A, B> {
  readonly html$: Stream<string>
}

/**
 * Renders mostly-dom `VNode`s into HTML for server-side rendering.
 * @name html<A = Element, B = Event>(sinks: HtmlSinks): HtmlSources<A, B>
 * @example
 * import { run } from '@motorcycle/run'
 * import { html, HtmlResponses, HtmlRequests } from '@motorcycle/mostly-html'
 * import { main } from './main'
 * import { observe } from '@motorcycle/stream'
 *
 * const { responses: { html$ } } = run<HtmlResponses, HtmlRequests>(main, Html)
 *
 * observe(html => { /* Do something with html *\/ }, html$)
 */
export const html: Dialogue<HtmlRequests, HtmlResponses> = function<A = Element, B = Event>(
  rs: HtmlRequests
) {
  const { view$ } = rs
  const html$ = hold(map(toHtml, view$))
  const dom = new HtmlDom<A, B>([])

  return { dom, html$ }
}
