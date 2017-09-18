import { HtmlSinks, HtmlSources } from './types'
import { hold, map } from '@motorcycle/stream'

import { HtmlDomSource } from './HtmlDomSource'
import { toHtml } from 'mostly-html'

/**
 * Renders mostly-dom VNodes into HTML for server-side rendering.
 * @name Html<A = Element, B = Event>(sinks: HtmlSinks): HtmlSources<A, B>
 * @example
 * import { run } from '@motorcycle/run'
 * import { Html, HtmlSources, HtmlSinks } from '@motorcycle/mostly-html'
 * import { UI } from './UI'
 * import { observe } from '@motorcycle/stream'
 *
 * const { sources: { html$ } } = run<HtmlSources, HtmlSinks>(UI, Html)
 *
 * observe((html: string) => { /* Do something with html *\/ }, html$)
 */
export function Html<A = Element, B = Event>(sinks: HtmlSinks): HtmlSources<A, B> {
  const { view$ } = sinks

  const html$ = hold(map(toHtml, view$))
  const dom = new HtmlDomSource<A, B>([])

  return { dom, html$ }
}
