import { Scheduler, Sink, Stream, Time } from '@motorcycle/types'

import { MulticastSource } from '@most/core'

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
  private scheduler: Scheduler

  constructor(stream: Stream<A>) {
    super(stream)
  }

  public run(sink: Sink<A>, scheduler: Scheduler) {
    this.scheduler = scheduler

    return super.run(sink, scheduler)
  }

  public add(sink: Sink<A>) {
    if (this.has) sink.event(this.scheduler.currentTime(), this.value)

    return super.add(sink)
  }

  public event(time: Time, value: A) {
    this.has = true
    this.value = value

    return super.event(time, value)
  }
}
