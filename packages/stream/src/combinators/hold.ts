import { Scheduler, Sink, Stream, Time } from '@motorcycle/types'

import { MulticastSource } from '@most/core'

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
    if (this.has) sink.event(this.scheduler.now(), this.value)

    return super.add(sink)
  }

  public event(time: Time, value: A) {
    this.has = true
    this.value = value

    return super.event(time, value)
  }
}
