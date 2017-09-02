import { Disposable, Scheduler, Sink, Stream } from '@motorcycle/types'

// TODO: replace with @most/dom-event when updated to work with @most/core
export function popState(): Stream<PopStateEvent> {
  return {
    run(sink: Sink<PopStateEventInit>, scheduler: Scheduler): Disposable {
      const event = (value: PopStateEvent) => sink.event(scheduler.now(), value)

      window.addEventListener('popstate', event)

      const dispose = () => window.removeEventListener('popstate', event)

      return { dispose }
    },
  }
}
