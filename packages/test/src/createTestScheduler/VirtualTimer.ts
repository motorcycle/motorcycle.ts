import { Delay, Handle, Time, Timer } from '@motorcycle/types'

/**
 * A Timer instance with control over how time progresses.
 * 
 * @name VirtualTimer
 * @example
 * import { VirtualTimer } from '@motorcycle/test'
 * 
 * const timer = new VirtualTimer()
 * 
 * timer.setTimer(() => console.log('Hello'), 100)
 * 
 * timer.tick(100)
 */
export class VirtualTimer implements Timer {
  protected time: Time = 0
  protected targetTime: Time = 0
  protected currentTime: Time = Infinity
  protected task: (() => any) | void = void 0
  protected timer: Handle
  protected active: boolean = false
  protected running: boolean = false
  protected key: Handle = {}
  protected promise: Promise<void> = Promise.resolve()

  constructor() {}

  public now(): Time {
    return this.time
  }

  public setTimer(fn: () => any, delay: Delay): Handle {
    if (this.task !== void 0) throw new Error('Virtualtimer: Only supports one in-flight task')

    this.task = fn
    this.currentTime = this.time + Math.max(0, delay)
    if (this.active) this.run()

    return this.key
  }

  public clearTimer(handle: Handle) {
    if (handle !== this.key) return

    clearTimeout(this.timer)
    this.timer = void 0

    this.currentTime = Infinity
    this.task = void 0
  }

  public tick(delay: Delay) {
    if (delay <= 0) return this.promise

    this.targetTime = this.targetTime + delay

    return this.run()
  }

  protected run() {
    if (this.running) return this.promise

    this.running = true
    this.active = true

    return new Promise<void>((resolve, reject) => {
      this.timer = setTimeout(() => {
        this.step()
          .then(() => resolve())
          .catch(reject)
      }, 0)
    })
  }

  protected step() {
    return new Promise((resolve, reject) => {
      if (this.time >= this.targetTime) {
        this.time = this.targetTime
        this.currentTime = Infinity
        this.running = false
        return resolve()
      }

      const task = this.task

      this.task = void 0

      this.time = this.currentTime
      this.currentTime = Infinity

      if (typeof task === 'function') task()

      this.timer = setTimeout(
        () =>
          this.step()
            .then(() => resolve())
            .catch(reject),
        0
      )
    })
  }
}
