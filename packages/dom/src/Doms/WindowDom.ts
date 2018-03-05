import { CssSelector, Dom, StandardEventTypes } from '../'
import { map, multicast, switchLatest } from '@motorcycle/stream'

import { EventStream } from '../common'
import { Stream } from '@motorcycle/types'

export class WindowDom implements Dom<Window, Event> {
  public w$: Stream<Window>

  constructor(w$: Stream<Window>) {
    this.w$ = w$
  }

  public query(): Dom<Window, Event> {
    return this
  }

  public elements(): Stream<ReadonlyArray<Window>> {
    return map<Window, ReadonlyArray<Window>>(Array, this.w$)
  }

  public event<Ev extends Event = Event>(
    et: StandardEventTypes,
    o: EventListenerOptions = {}
  ): Stream<Ev> {
    const ev$$ = map(w => new EventStream(et, w, o), this.w$)

    return multicast(switchLatest(ev$$))
  }

  public cssSelectors(): ReadonlyArray<CssSelector> {
    return []
  }
}
