import { Disposable, Scheduler, Sink, Stream, Time } from '@motorcycle/types'
import { MulticastSource, propagateEventTask } from '@most/core'
import { disposeBoth, disposeNone, disposeOnce } from '@most/disposable'

import { asap } from '@most/scheduler'

/**
 * Deliver the most recently seen event to each new observer the instant it
 * begins observing. A held stream is always multicast.
 *
 * Given an input stream:
 *
 * ```
 * stream:    -a---b---c---d->
 * ```
 *
 * observers which begin observing at different times will see:
 *
 * ```
 * observer1: -a---b---c---d->
 * observer2:    a-b---c---d->
 * observer3:           c--d->
 * ```
 *
 * @name hold<A>(stream: Stream<A>): Stream<A>
 *
 * @example
 * import { createDocumentDomSource events } from '@motorcycle/dom'
 * import { drain, hold, map } from @motorcycle/stream'
 *
 * const doc = createDocumentDomSource(now(document))
 *
 * // start holding on first subscription
 * const click$ = hold(map(e => ({ x: e.clientX, y: e.clientY }), events('click', doc)))
 *
 * // hold the latest event even before the first subscription
 * drain(click$)
 */
export function hold<A>(stream: Stream<A>): Stream<A> {
  return new Hold<A>(stream)
}

class Hold<A> extends MulticastSource<A> implements Stream<A> {
  private has: boolean
  private value: A

  constructor(stream: Stream<A>) {
    super(stream)
  }

  public run(sink: Sink<A>, scheduler: Scheduler) {
    const [numberOfSinks, disposable] = this.addSink(sink, scheduler)

    if (numberOfSinks === 1) this.disposable = this.source.run(this, scheduler)

    const holdDisposable = disposeOnce(new HoldDisposable<A>(this, sink))

    return disposeBoth(holdDisposable, disposable)
  }

  public addSink(sink: Sink<A>, scheduler: Scheduler): [number, Disposable] {
    const { has, value } = this

    const disposable: Disposable = has
      ? asap(propagateEventTask(value, sink), scheduler)
      : disposeNone()

    const numberOfSinks = super.add(sink)

    return [numberOfSinks, disposable]
  }

  public event(time: Time, value: A) {
    this.has = true
    this.value = value

    return super.event(time, value)
  }
}

class HoldDisposable<A> implements Disposable {
  constructor(private source: Hold<A>, private sink: Sink<A>) {}

  public dispose(): void {
    if (this.source.remove(this.sink) === 0) this.source.dispose()
  }
}
