# @motorcycle/test -- 2.0.0

Testing functions for Motorcycle.ts

## Get it
```sh
yarn add @motorcycle/test
# or
npm install --save @motorcycle/test
```

## API Documentation

All functions are curried!

#### TestScheduler

<p>

TestScheduler

</p>


```typescript

export type TestScheduler = {
  readonly tick: (delay: Delay) => Promise<void>
  readonly scheduler: Scheduler
}

```


#### VirtualTimer

<p>

A Timer instance with control over how time progresses.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { VirtualTimer } from '@motorcycle/test'

const timer = new VirtualTimer()

timer.setTimer(() => console.log('Hello'), 100)

timer.tick(100)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

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

```

</details>

<hr />


#### collectEventsFor\<A\>(delay: Delay, stream: Stream\<A\>): Promise\<ReadonlyArray\<A\>\>

<p>

Collects events for a given amount of time.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
// Mocha style tests
it('increasing value by one', () => {
  const stream = scan(x => x + 1, skip(1, periodic(10)))

  return collectEventsFor(30, stream).then(events => assert.deepEqual(events, [0, 1, 2, 3]))
})
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const collectEventsFor: CollectEventsFor = curry2(function collectEventsFor<A>(
  delay: Delay,
  stream: Stream<A>
) {
  const { tick, scheduler } = createTestScheduler()

  const eventList: Array<A> = []

  runEffects(tap(a => eventList.push(a), stream), scheduler)

  return tick(delay).then(() => eventList.slice())
})

export interface CollectEventsFor {
  <A>(delay: Delay, stream: Stream<A>): Promise<ReadonlyArray<A>>
  (delay: Delay): <A>(stream: Stream<A>) => Promise<ReadonlyArray<A>>
  <A>(delay: Delay): (stream: Stream<A>) => Promise<ReadonlyArray<A>>
}

```

</details>

<hr />


#### createTestScheduler(timeline?: Timeline): TestScheduler

<p>

Creates a test scheduler. Using the test scheduler you are the master of time.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createTestScheduler } from '@motorcycle/test'
import { now, runEffects } from '@motorcycle/stream'

const { tick, scheduler } createTestScheduler()

const stream = now(100)

runEffects(stream, scheduler).then(() => console.log('done!'))

// manually tick forward in time
// tick returns a Promise that resolves when all scheduled tasks have been run.
tick(100)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function createTestScheduler(timeline: Timeline = newTimeline()): TestScheduler {
  const timer = new VirtualTimer()

  const tick = (delay: Delay) => timer.tick(delay)

  const scheduler: Scheduler = newScheduler(timer, timeline)

  return { tick, scheduler }
}

```

</details>

<hr />


#### run\<Sources, Sinks\>(UI: Component\<Sources, Sinks\>, Application: EffectfulComponent\<Sinks, Sources\>)

<p>

This is nearly identical to the `run` found inside of `@motorcycle/run`. The 
only difference is that it makes use of the test scheduler to create the 
application's event loop. An additional property is returned with the `tick` 
that allows you to control how time progresses.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { run } from '@motorcycle/test'
import { makeDomComponent, div, button, h2, query, clickEvent } from '@motorcycle/dom'

function UI(sources) {
  const { dom } = sources

  const click$ = clickEvent(query('button', dom))

  const count$ = scan(x => x + 1, click$)

  const view$ = map(view, count$)

  return { view$ }
}

function view(count: number) {
  return div([
    h2(`Clicked ${count} times`),
    button('Click Me'),
  ])
}

const Dom = fakeDomComponent({
  'button': {
    click: now(fakeEvent())
  }
})

const { tick, dispose } = run(UI, Dom)

tick(500).then(dispose)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function run<
  Sources extends Readonly<Record<string, any>>,
  Sinks extends Readonly<Record<string, Stream<any>>>
>(UI: Component<Sources, Sinks>, Application: EffectfulComponent<Sinks, Sources>) {
  const { stream: endSignal } = createProxy<void>()

  const sinkProxies = {} as Record<keyof Sinks, ProxyStream<any>>
  const proxySinks: Sinks = createProxySinks(sinkProxies, endSignal)
  const sources: Sources = Application(proxySinks)
  const sinks: Sinks = createDisposableSinks(UI(sources), endSignal)

  const { disposable, tick } = replicateSinks(sinks, sinkProxies)

  function dispose() {
    endSignal.event(scheduler.currentTime(), void 0)
    disposable.dispose()
    disposeSources(sources)
  }

  return { sinks, sources, dispose, tick }
}

```

</details>

<hr />
