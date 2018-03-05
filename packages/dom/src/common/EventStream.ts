import { Disposable, Scheduler, Sink, Stream } from '@motorcycle/types'

import { StandardEventTypes } from '../'

export class EventStream<Ev extends Event> implements Stream<Ev> {
  private eventType: StandardEventTypes
  private element: EventTarget
  private options: EventListenerOptions

  constructor(eventType: StandardEventTypes, element: EventTarget, options: EventListenerOptions) {
    this.eventType = eventType
    this.element = element
    this.options = options
  }

  public run(sink: Sink<Ev>, scheduler: Scheduler): Disposable {
    const { eventType, element, options: { capture } } = this

    const listener = (event: Ev) => sink.event(scheduler.currentTime(), event)

    const dispose = () => element.removeEventListener(eventType, listener, capture)

    element.addEventListener(eventType, listener, capture)

    return { dispose }
  }
}
