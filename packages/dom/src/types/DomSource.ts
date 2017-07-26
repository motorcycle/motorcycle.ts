import { StandardEvents } from './Events'
import { Stream } from '@motorcycle/types'

export interface DomSource {
  query(cssSelector: CssSelector): DomSource
  elements<El extends Element = Element>(): Stream<ReadonlyArray<El>>
  events<Ev extends Event = Event>(
    eventType: StandardEvents,
    options?: AddEventListenerOptions
  ): Stream<Ev>
  cssSelectors(): ReadonlyArray<CssSelector>
}

export type CssSelector = string
