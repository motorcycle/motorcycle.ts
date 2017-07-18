import { Disposable, Scheduler, Sink, Stream } from '@motorcycle/types'
import { MulticastSource, never } from '@most/core'

import { scheduler } from '../../scheduler'

export class ProxyStream<A> extends MulticastSource<A> {
  public attached: boolean = false
  public running: boolean = false
  public scheduler: Scheduler = scheduler

  constructor() {
    super(never())
  }

  public run(sink: Sink<A>, scheduler: Scheduler): Disposable {
    this.add(sink)

    if (this.attached && !this.running) {
      this.running = true
      this.scheduler = scheduler
      this.disposable = this.source.run(this, scheduler)

      return this.disposable
    }

    return new ProxyDisposable(this, sink)
  }

  public attach(stream: Stream<A>): Stream<A> {
    if (this.attached) throw new Error('Can only proxy 1 stream')

    this.attached = true

    if (this.sinks.length > 0) {
      this.disposable = stream.run(this, this.scheduler)
    } else this.source = stream

    return stream
  }

  public end(time: number): void {
    this.attached = false
    this.running = false

    super.end(time)
  }
}

class ProxyDisposable<T> implements Disposable {
  private source: ProxyStream<T>
  private sink: Sink<T>
  private disposed: boolean

  constructor(source: ProxyStream<T>, sink: Sink<T>) {
    this.source = source
    this.sink = sink
    this.disposed = false
  }

  public dispose() {
    if (this.disposed) return

    this.disposed = true
    const remaining = this.source.remove(this.sink)
    return remaining === 0 && this.source.dispose()
  }
}
