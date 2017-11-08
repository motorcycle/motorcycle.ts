import { Disposable, Scheduler, Sink, Stream, Time } from '@motorcycle/types'

/**
 * Returns a stream that will only emit it's last value right before
 * ending. If the stream does not end, then no events will ever occur.
 * If the stream ends before emitting a value, no value will emit.
 * @name last<A>(stream: Stream<A>): Stream<A>
 */
export function last<A>(stream: Stream<A>): Stream<A> {
  return new Last(stream)
}

class Last<A> implements Stream<A> {
  constructor(private source: Stream<A>) {}

  public run(sink: Sink<A>, scheduler: Scheduler): Disposable {
    return this.source.run(new LastSink(sink), scheduler)
  }
}

class LastSink<A> implements Sink<A> {
  private has: boolean = false
  private value: A

  constructor(private sink: Sink<A>) {}

  public event(_: Time, value: A) {
    this.has = true
    this.value = value
  }

  public error(time: Time, error: Error) {
    this.has = false
    this.sink.error(time, error)
  }

  public end(time: Time) {
    if (this.has) this.sink.event(time, this.value)

    this.has = false

    this.sink.end(time)
  }
}
