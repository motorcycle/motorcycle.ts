# @motorcycle/stream -- 1.7.0

Functional and reactive event streams for Motorcycle.ts

## Get it
```sh
yarn add @motorcycle/stream
# or
npm install --save @motorcycle/stream
```

## API Documentation

All functions are curried!

#### ap\<A, B\>(fns: Stream\<(value: A) =\> B\>, values: Stream\<A\>): Stream\<B\>

<p>

Applies a stream of functions to the latest from a stream of values.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { ap, now, periodic, scan, skip, observe } from '@motorcycle/stream'

const count$ = scan(x => x + 1, 0, skip(1, periodic(100)))

const fn$ = now(x => x * x)

const stream = ap(fn$, count$)

observe(console.log, stream)
// 0
// 4
// 9
// ...
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { ap } from '@most/core'

```

</details>

<hr />


#### at\<A\>(time: number, value: A): Stream\<A\>

<p>

Create a stream containing a single event at a specific time.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { at, observe } from '@motorcycle/stream'

observe(console.log, at(1000, 'Hello'))
// After 1 second
// logs 'Hello'
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { at } from '@most/core'

```

</details>

<hr />


#### awaitPromises\<A\>(stream: Stream\<Promise\<A\>\>): Stream\<A\>

<p>

Turn a stream of promises into a stream containing the promises' values.
Note that order is always preserved, regardless of promise fulfillment order.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { mergeArray, fromPromise, at, now, observe } from '@motorcycle/stream'

// ----1------->
const a = new Promise(resolve => setTimeout(resolve, 100, 1))
// ---------2-->
const b = new Promise(resolve => setTimeout(resolve, 200, 2))
// --3--------->
const c = new Promise(resolve => setTimeout(resolve, 50, 3))

// bc---a------->
const source = mergeArray([ at(100, a), now(b), now(c) ])

// -----1----23->
const stream = awaitPromises(source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { awaitPromises } from '@most/core'

```

</details>

<hr />


#### chain\<A, B\>(f: (value: A) =\> Stream\<B\>, stream: Stream\<A\>): Stream\<B\>

<p>

Creates a new stream by applying a stream-returning function to every event 
value and merging them into the resulting stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { chain, now, observe } from '@motorcycle/stream'

const stream = chain(x => now(x * 2), now(1000))

observe(console.log, stream) 
// 2000
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { chain } from '@most/core'

```

</details>

<hr />


#### combine\<A, B, C\>(f: (a: A, b: B) =\> C, a$: Stream\<A\>, b$: Stream\<B\>): Stream\<C\>

<p>

Apply a function to the most recent event from each stream when a new event arrives on any stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { combine, at, merge, observe } from '@motorcycle/stream'

const a$ = merge(at(100, 100), at(200, 200))
const b$ = merge(at(200, 3000), at(250, 100))

const stream = combine(add, a$, b$)

observe(console.log, stream)
// 3200 -- at time 200 as a result of add(200, 3000)
// 350 -- at time 250 as a result of add(200, 100)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { combine } from '@most/core'

```

</details>

<hr />


#### combineArray\<A, B, C\>(f: (a: A, b: B) =\> C, streams: [ Stream\<A\>, Stream\<B\> ]): Stream\<C\>

<p>

Applies a function to the most recent event from all streams when a new 
event arrives on any stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { combineArray, now, merge, at, observe } from '@motorcycle/stream'

const a$ = now(1000)
const b$ = now(2000)
const c$ = merge(at(100, 1), at(200, 2))

const sum = (x, y, z) => x + y + z

const stream = combineArray(sum, [ a$, b$, c$ ])

observe(console.log, stream)
// 3001 -- at time 100 as result of sum(1000, 2000, 1)
// 30002 -- at time 200 as result of sum(1000, 2000, 2)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { combineArray } from '@most/core'

```

</details>

<hr />


#### combineObj\<Obj extends object\>(obj: { [K in keyof Obj]: Stream\<Obj[K]\> }): Stream\<Obj\>

<p>

Takes an object of streams and returns a Stream of an object.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { combineObj, now } from '@motorcycle/stream'

const obj = { a: now(1), b: now(2), c: now(3) }

const stream: Stream<{ a: number, b: number, c: number }> = combineObj(obj)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function combineObj<Obj extends object>(
  object: { readonly [K in keyof Obj]: Stream<Obj[K]> }
): Stream<Obj> {
  const objectKeys = keys(object)
  const sources = values(object) as Array<Stream<Obj[keyof Obj]>>

  return combineArray((...values: Array<Obj[keyof Obj]>) => {
    const valuesMap = {} as Obj

    for (let i = 0; i < length(values); ++i) valuesMap[objectKeys[i]] = values[i]

    return valuesMap
  }, sources)
}

```

</details>

<hr />


#### concatMap\<A, B\>(f: (value: A) =\> Stream\<B\>, stream: Stream\<A\>): Stream\<B\>

<p>

Creates a new stream by lazily applying a stream-returning function
to each event value of a stream concatenating that stream's values to the 
resulting stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { concatMap, now, observe } from '@motorcycle/stream'

const source = // --104--101--108--108--111|

const f = (x: number) => now(String.fromCharCode(x))

const stream = concatMap(f, source)

observe(console.log, stream)
// h
// e
// l
// l
// o
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { concatMap } from '@most/core'

```

</details>

<hr />


#### constant\<A\>(value: A, stream: Stream\<any\>): Stream\<A\>

<p>

Replace each event on a stream with a given value.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { constant, periodic, observe } from '@motorcycle/stream'

const stream = constant(100, periodic(1000))

observe(console.log, stream) // every 1 second logs 100
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { constant } from '@most/core'

```

</details>

<hr />


#### continueWith(f: () =\> Stream\<A\>, stream: Stream\<A\>): Stream\<A\>

<p>

Replace the end signal with a new stream returned by f. Note that f must return a stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { continueWith, at } from '@motorcycle/stream'

// ----1------>
const a = at(100, 1)
// ----2------>
const b = at(100, 2)

// ----1----2->
const stream = continueWith(() => b, a)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { continueWith } from '@most/core'

```

</details>

<hr />


#### debounce\<A\>(ms: number, stream: Stream\<A\>): Stream\<A\>

<p>

Wait for a burst of events to subside and keep only the last event in the burst.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { debounce } from '@motorcycle/stream'

const source = // abcd----abcd--->
//                -----d-------d->
const stream = debounce(2, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { debounce } from '@most/core'

```

</details>

<hr />


#### delay\<A\>(ms: number, stream: Stream\<A\>): Stream\<A\>

<p>

Timeshift a stream by a number of milliseconds.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { delay } from '@motorcycle/stream'

const source = -1--2--3--4--5---->
//             ----1--2--3--4--5->
const stream = delay(3, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { delay } from '@most/core'

```

</details>

<hr />


#### drain\<A\>(stream: Stream\<A\>): Promise\<void\>

<p>

Activates a stream using an default scheduler instance from `@most/scheduler`,
returning a promise of completion.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { drain } from '@motorcycle/stream'

drain(stream)
 .then(() => console.log('complete'))
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const drain = <A>(stream: Stream<A>): Promise<void> => runEffects(stream, scheduler)

```

</details>

<hr />


#### during\<A\>(signal: Stream\<Stream\<any\>\>, stream: Stream\<A\>): Stream\<A\>

<p>

Keep events that occur during a time window defined by a higher-order stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { during } from '@motorcycle/stream'

const source = // -1-2-3-4-5-6-7-8->
const signal = // ------s---------->
const s      = //       --------x-->
//                -------4-5-6-7|
const stream = during(signal, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { during } from '@most/core'

```

</details>

<hr />


#### empty\<A\>(): Stream\<A\>

<p>

Create a stream containing no events, which ends immediately.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { empty, drain } from '@motorcycle/stream'

const stream = empty()

drain(stream)
 .then(() => console.log('complete'))
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { empty } from '@most/core'

```

</details>

<hr />


#### filter\<A\>(predicate: (value: A) =\> boolean, stream: Stream\<A\>): Stream\<A\>

<p>

Retain only events for which a predicate is truthy.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { filter, observe } from '@motorcycle/stream'

const source = // ---true---false---true---|

// resulting stream only contains truthy values
const stream = filter(Boolean, source)

observe(console.log, stream)
// true
// true
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { filter } from '@most/core'

```

</details>

<hr />


#### fromPromise\<A\>(promise: Promise\<A\>): Stream\<A\>

<p>

Create a stream containing a promise's value.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { fromPromise, observe } from '@motorcycle/stream'

const a = fromPromise(Promise.resolve(1))
const b = fromPromise(Promise.reject(new Error('failure')))

observe(console.log, a)
 .then(() => console.log('done'))
 .catch(err => console.error(err.message))
// 1
// done

observe(console.log, b)
 .then(() => console.log('done'))
 .catch(err => console.error(err.message))
// 'failure'
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { fromPromise } from '@most/core'

```

</details>

<hr />


#### hold\<A\>(stream: Stream\<A\>): Stream\<A\>

<p>

Deliver the most recently seen event to each new observer the instant it
begins observing. A held stream is always multicast.

Given an input stream:

```
stream:    -a---b---c---d-\>
```

observers which begin observing at different times will see:

```
observer1: -a---b---c---d-\>
observer2:    a-b---c---d-\>
observer3:           c--d-\>
```

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { createDocumentDomSource events } from '@motorcycle/dom'
import { drain, hold, map } from @motorcycle/stream'

const doc = createDocumentDomSource(now(document))

// start holding on first subscription
const click$ = hold(map(e => ({ x: e.clientX, y: e.clientY }), events('click', doc)))

// hold the latest event even before the first subscription
drain(click$)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

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

```

</details>

<hr />


#### loop\<A, B, C\>(f: (accumulator: B, value: A) =\> { seed: B, value: C }, initial: B, stream: Stream\<A\>): Stream\<A\>

<p>

Accumulate results using a feedback loop that emits one value and feeds back 
another to be used in the next iteration.

It allows you to maintain and update a "state" while emitting a different 
value. In contrast, scan feeds back and produces the same value.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { loop, periodic, filter, observe } from '@motorcycle/stream'

function pairwiseInterval (acc: number): { seed: number, value: [number, number] } {
  const seed = acc + 1
  const value =  [ acc, seed ]

  return { seed, value }
}

const stream = loop(pairwiseInterval, periodic(100))

observe(console.log, stream)
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
// ....
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { loop } from '@most/core'

```

</details>

<hr />


#### map\<A, B\>(f: (value: A) =\> B, stream: Stream\<A\>): Stream\<B\>

<p>

Apply a function to each event value of a stream, returning a new 
stream containing the returned values.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { map, now, observe } from '@motorcycle/stream'

const stream = map(x => x + 1, now(100))

observe(console.log, stream) // 101
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { map } from '@most/core'

```

</details>

<hr />


#### mapSinks\<Sinks, A\>(f: (sinks: Sinks, index: number) =\> A, sinksList$: Stream\<Array\<Sinks\>\>): Stream\<ReadonlyArray\<A\>\>

<p>

Applies a function to all Sinks in a list of Sinks.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { mapSinks } from '@motorcycle/stream'

function Component(sources) {
  const { listOfData$ } = sources

  const sinksList$: Stream<ReadonlyArray<Sinks>> = map(
    listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) })), 
    listOfData$,
  )

  const childViews$: Stream<ReadonlyArray<Stream<VNode>> = 
    mapSinks(sinks => sinks.view$, sinksList$)

  ...
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const mapSinks: MapSinksArity2 = curry2(function mapSinks<
  Sinks extends { readonly [key: string]: Stream<any> },
  A
>(
  f: (sinks: Sinks, index: number) => A,
  sinksList$: Stream<Array<Sinks>>
): Stream<ReadonlyArray<A>> {
  return map<Array<Sinks>, ReadonlyArray<A>>(arrayMap(f), sinksList$)
})

export interface MapSinksArity2 {
  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<Array<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<ArrayLike<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A,
    sinksList$: Stream<ReadonlyArray<Sinks>>
  ): Stream<ReadonlyArray<A>>

  <Sinks extends { readonly [key: string]: Stream<any> }, A>(
    f: (sinks: Sinks, index: number) => A
  ): MapSinksArity1<Sinks, A>
}

export interface MapSinksArity1<Sinks extends { readonly [key: string]: Stream<any> }, A> {
  (sinksList$: Stream<Array<Sinks>>): Stream<ReadonlyArray<A>>
  (sinksList$: Stream<ArrayLike<Sinks>>): Stream<ReadonlyArray<A>>
  (sinksList$: Stream<Readonly<Sinks>>): Stream<ReadonlyArray<A>>
}

```

</details>

<hr />


#### merge\<A\>(a: Stream\<A\>, b: Stream\<A\>): Stream\<A\>

<p>

Creates a new Stream containing events from both streams.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { merge, at, observe } from '@motorcycle/stream'

const stream = merge(at(1000, 'World'), at(100, 'Hello'))

observe(console.log, stream)
// Hello -- at time 100
// World -- at time 1000
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { merge } from '@most/core'

```

</details>

<hr />


#### mergeArray\<A\>(stream: Array\<Stream\<A\>\>): Stream\<A\>

<p>

Creates a new stream containing all events of underlying streams.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { at, mergeArray, observe } from '@motorcycle/stream'

const stream = mergeArray([
  at(100, 'foo'),
  at(300, 'baz')
  at(200, 'bar'),
])

observe(console.log, stream)
// foo -- at time 100
// bar -- at time 200
// baz -- at time 300
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { mergeArray } from '@most/core'

```

</details>

<hr />


#### multicast\<A\>(stream: Stream\<A\>): Stream\<A\>

<p>

Returns a stream equivalent to the original, but which can be shared more 
efficiently among multiple consumers.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { multicast, observe } from '@motorcycle/stream'

// --1--2--3--4--5--6--7--8-->
const source = // ...

// --1--2--3--4--5--6--7--8-->
observe(console.log, source)

setTimeout(() => {
// --------------1--2--3--4--5--6--7--8-->
  observe(console.log, source)
}, 5)

const stream = multicast(source)

// --1--2--3--4--5--6--7--8-->
observe(console.log, stream)

setTimeout(() => {
// --------------5--6--7--8-->
  observe(console.log, stream)
}, 5)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { multicast } from '@most/core'

```

</details>

<hr />


#### never\<A\>(): Stream\<A\>

<p>

Create a stream containing no events, which never ends.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { never, drain } from '@motorcycle/stream'

const stream = never()

drain(stream) // Returns a promise that never fulfills.
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { never } from '@most/core'

```

</details>

<hr />


#### now\<A\>(value: A): Stream\<A\>

<p>

Create a stream containing a single event at time 0

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { now, observe } from '@motorcycle/stream'

const stream = now(1)

observe(console.log, stream)
// 1
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { now } from '@most/core'

```

</details>

<hr />


#### observe\<A\>(f: (value: A) =\> any, stream: Stream\<A\>): Promise\<void\>

<p>

Activates a stream, calling a function `f` with each event value, and returns 
a Promise of completion.

</p>


<details>
  <summary>See an example</summary>
  
```typescript

```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const observe: Observe = curry2(<A>(f: (value: A) => any, stream: Stream<A>): Promise<
  void
> => drain(tap(f, stream)))

export interface Observe {
  <A>(f: (value: A) => any, stream: Stream<A>): Promise<void>
  <A>(f: (value: A) => any): (stream: Stream<A>) => Promise<void>
}

```

</details>

<hr />


#### periodic(ms: number): Stream\<void\>

<p>

Creates a stream that emits ever time 0 and every `n` milliseconds after.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { periodic } from '@motorcycle/stream'

// void----void----void----void---->
const stream = periodic(5)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { periodic } from '@most/core'

```

</details>

<hr />


#### recoverWith\<A\>((err: Error) =\> Stream\<A\>, stream: Stream\<A\>): Stream\<A\>

<p>

Recover from a stream failure by calling a function to create a new stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { recoverWith } from '@motorcycle/stream'

// -1-2-3X------->
const a = // ...
// -4-5-6-------->
const b = // ...

// -1-2-3-4-5-6-->
const stream = recoverWith(() => b, a)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { recoverWith } from '@most/core'

```

</details>

<hr />


#### runEffects\<A\>(stream: Stream\<A\>, scheduler: Scheduler): Promise\<void\>

<p>

Activate an event stream, and consume all its events.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { runEffects, tap } from '@motorcycle/stream'
import { newDefaultScheduler } from '@most/scheduler'

const logStream = tap(console.log, stream)

runEffects(logStream, newDefaultScheduler())
 .then(() => console.log('complete'))
 .catch(err => console.error(err))
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { runEffects } from '@most/core'

```

</details>

<hr />


#### sample\<A, B, C\>(f: (a: A, b: B) =\> C, sampler: Stream\<A\>, stream: Stream\<B\>): Stream\<C\>

<p>

For each event in a sampler stream, apply a function to combine it with the 
most recent event in another stream. The resulting stream will contain the 
same number of events as the sampler stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
s1:                       -1--2--3--4--5->
sampler:                  -1-----2-----3->
sample(sum, sampler, s1): -2-----5-----8->

s1:                       -1-----2-----3->
sampler:                  -1--2--3--4--5->
sample(sum, sampler, s1): -2--3--5--6--8->
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { sample } from '@most/core'

```

</details>

<hr />


#### sampleWith\<A\>(sampler: Stream\<any\>, stream: Stream\<A\>): Stream\<A\>

<p>

Given each event occurrence from a sampler stream takes the latest value from 
the given stream. 

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { sampleWith } from '@motorcycle/stream'

function submit(dom: DomSource): Stream<string> {
  const button = query('button', dom)
  const input = query('input', dom)

  const click$ = events('click', button)
  const value$ = map(ev => ev.target.value, events('input', input))

  return sampleWith(click$, value$)
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const sampleWith = sample(takeRight) as SampleWith

export interface SampleWith {
  <A>(sampler: Stream<any>, stream: Stream<A>): Stream<A>
  <A>(sampler: Stream<any>): (stream: Stream<A>) => Stream<A>
  (sampler: Stream<any>): <A>(stream: Stream<A>) => Stream<A>
}

function takeRight<A>(_: any, value: A): A {
  return value
}

```

</details>

<hr />


#### scan\<A, B\>(f: (seed: B, value: A) =\> B, initial: B, stream: Stream\<A\>): Stream\<B\>

<p>

Incrementally accumulate results, starting with the provided initial value.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { scan, periodic, observe } from '@motorcycle/stream'

// creates a stream that increments by 1 every 1000ms
const count$ = scan(x => x + 1, 0, periodic(1000))

observe(console.log, count$)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { scan } from '@most/core'

```

</details>

<hr />


#### scheduler (Scheduler)

<p>

A shared instance of the default scheduler from @most/scheduler

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { scheduler, now } from '@motorcycle/stream'

const stream = now(1)

const sink = {
  event(time: number, value: number) { ... },
  error(time: number, err: Error) { ... },
  end(time: number) { ... }
}

const disposable = stream.run(sink, scheduler)

// later 
disposable.dispose()
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const scheduler: Scheduler = newDefaultScheduler()

```

</details>

<hr />


#### since\<A\>(startSingal: Stream\<any\>, stream: Stream\<A\>): Stream\<A\>

<p>

Discard all events in one stream until the first event occurs in another.:

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { since } from '@motorcycle/stream'

const source = // -1-2-3-4-5-6-7-8->
const start =  // --------x-------->
//                ---------5-6-7-8->
const stream = since(start, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { since } from '@most/core'

```

</details>

<hr />


#### skip\<A\>(quanity: number, stream: Stream\<A\>): Stream\<A\>

<p>

Skip the first `n` number of events.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { skip } from '@motorcycle/stream'

const source = // -1-2-3-4-5-6-7-8-9-10->
//                -----------6-7-8-9-10->
const stream = skip(5, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { skip } from '@most/core'

```

</details>

<hr />


#### skipAfter\<A\>(predicate: (value: A) =\> boolean, stream: Stream\<A\>): Stream\<A\>

<p>

Discard all events after the first event for which predicate returns true.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { skipAfter } from '@motorcycle/stream'

const source = // --1-2-3-4-5-6-7-8->
//                --1-2|
const stream = skipAfter(even, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { skipAfter } from '@most/core'

```

</details>

<hr />


#### skipRepeats\<A\>(stream: Stream\<A\>): Stream\<A\>

<p>

Remove adjacent events that are equal in terms of value equality.

</p>


<details>
  <summary>See an example</summary>
  
```typescript

const a = { a: 1 }
const b = Object.assign({}, a)
const c = { c: 2 }

const source = // --a--b--a--c-->
//                --a--------c-->
const stream = skipRepeats(source)

observe(console.log, stream)
// { a: 1 }
// { c: 2 }
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const skipRepeats: SkipRepeats = skipRepeatsWith(equals)

export type SkipRepeats = <A>(stream: Stream<A>) => Stream<A>

```

</details>

<hr />


#### skipRepeatsWith\<A\>(predicate: (a: A, b: A) =\> boolean, stream: Stream\<A\>): Stream\<A\>

<p>

Remove adjacent repeated events, using the provided equality function to compare adjacent events.:

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { skipRepeatsWith, observe } from '@motorcycle/stream'
 
const source = // --a-b-B-c-D-d-e->

const equalsIgnoreCase = (a: string, b: string) =>
 a.toLowerCase() === b.toLowerCase()

const stream = skipRepeatsWith(equalsIgnoreCase, source)

observe(console.log, stream)
// a
// b
// c
// D
// e
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { skipRepeatsWith } from '@most/core'

```

</details>

<hr />


#### skipWhile(predicate: (value: A) =\> boolean, stream: Stream\<A\>): Stream\<A\>

<p>

Discard all events until predicate returns false, and keep the rest.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { skipWhile } from '@motorcycle/stream'

const source = // -2-4-5-6-8->
//                 ----5-6-8->
const stream = skipWhile(even, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { skipWhile } from '@most/core'

```

</details>

<hr />


#### slice\<A\>(skip: number, take: number, stream: Stream\<A\>): Stream\<A\>

<p>

Keep only events in a range, where start \<= index \< end, and index is the 
ordinal index of an event in stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { slice } from '@most/core'

const source = // --1--2--3--4--5--6--7--8--9--10-->
//                --------3--4--5|
const stream = slice(2, 3, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { slice } from '@most/core'

```

</details>

<hr />


#### startWith\<A\>(initialValue: A, stream: Stream\<A\>): Stream\<A\>

<p>

Prepends an event to a stream at time 0.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { startWith, at, observe } from '@motorcycle/stream'

const stream = startWith('Hello', at(1000, 'world'))

observe(console.log, stream)
// At time 0 logs 'Hello'
// At time 1000 logs 'world'
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { startWith } from '@most/core'

```

</details>

<hr />


#### switchCombine\<A\>(streamList$: Stream\<Array\<Stream\<A\>\>): Stream\<ReadonlyArray\<A\>\>

<p>

Flattens an array of streams into an array of values. Particularly useful
when dealing with a list of children components.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { switchCombine, mapSinks, map, now } from '@motorcycle/stream'

function Component(sources) {
  const { listOfData$ } = sources

  const childSinks$ = map(
    listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) }))
    listOfData$
  )

  const childViews$: Stream<ReadonlyArray<VNode>> = 
    switchCombine(mapSinks(sinks => sinks.view$, childSinks$))

  const view$ = map(view, childView$)

  return { view$ }
}

function view(childViews: ReadonlyArray<VNode>): VNode {
  // ...
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function switchCombine<A>(streamList$: Stream<Array<Stream<A>>>): Stream<ReadonlyArray<A>> {
  return switchLatest(
    map(
      streams => (streams.length === 0 ? now([]) : combineArray((...items) => items, streams)),
      streamList$
    )
  )
}

```

</details>

<hr />


#### switchLatest\<A\>(stream: Stream\<Stream\<A\>\>): Stream\<A\>

<p>

Given a higher-order stream, return a new stream that adopts the behavior of 
(ie emits the events of) the most recent inner stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { switchLatest, now } from '@motorcycle/stream'

const A = // -1--2--3----->
const B = // -4--5--6----->
const C = // -7--8--9----->

// --A-----B-----C-------->
const source = // ...

// ---1--2--4--5--7--8--9->
const stream = switchLatest(source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { switchLatest } from '@most/core'

```

</details>

<hr />


#### switchMerge\<A\>(streams$: Stream\<Array\<Stream\<A\>\>): Stream\<A\>

<p>

Merges a list of streams into a single stream containing events 
from all of the stream. Particularly useful when dealing with a list of 
child components.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { switchMerge, mapSinks, now } from '@motorcycle/stream'

function Component(sources) {
  const { listOfData$ } = sources

  const childSinks$ = map(
    listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) }))),
    listOfData$
  )

  const foo$ = switchMerge(mapSinks(sinks => sinks.foo$, childSinks$))

  return { foo$ } 
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function switchMerge<A>(streams$: Stream<Array<Stream<A>>>): Stream<A> {
  return switchLatest(map(mergeArray, streams$))
}

```

</details>

<hr />


#### switchSinkOr\<Sinks, K extends keyof Sinks\>(or$: Sinks[K], sinkName: K, sinks$: Stream\<Sinks\>): Sinks[K]

<p>

Flattens a stream of sinks into a single sink.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { switchSinkOr, map, now, never } from '@motorcycle/stream'

const switchSinkOrNever = switchSinkOr(never())

function Component(sources) {
  const { listOfItems$ } = sources

 const sinks$ = map(items => SubComponent({ ...sources, items$: now(items) }), listOfItems$)

 const history$ = switchSinkOrNever('history$', sinks$)

 return { history$ } 
}
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export const switchSinkOr: SwitchSinkOr = curry3<any, any, any, any>(function switchSinkOr<
  Sinks extends { readonly [key: string]: Stream<any> },
  K extends keyof Sinks = keyof Sinks
>(or$: Sinks[K], sinkName: K, sinks$: Stream<Sinks>): Sinks[K] {
  return switchLatest(map(sinks => sinks[sinkName] || or$, sinks$))
})

export interface SwitchSinkOr {
  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K],
    sinkName: K,
    sinks$: Stream<Sinks>
  ): Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K],
    sinkName: K
  ): (sinks$: Stream<Sinks>) => Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K]
  ): (sinkName: K, sinks$: Stream<Sinks>) => Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K]
  ): (sinkName: K) => (sinks$: Stream<Sinks>) => Sinks[K]
}

```

</details>

<hr />


#### take\<A\>(quantity: number, stream: Stream\<A\>): Stream\<A\>

<p>

Take at most the first `n` events of a stream.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { take } from '@motorcycle/stream'

const source = // -1-2-3-4-5-6-7-8-9-10->
//                -1-2-3|
const stream = take(3, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { take } from '@most/core'

```

</details>

<hr />


#### takeWhile\<A\>(predicate: (value: A) =\> boolean, stream: Stream\<A\>): Stream\<A\>

<p>

Keep all events until predicate returns false, and discard the rest.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { takeWhile } from '@motorcycle/stream'

const source = // -2-4-5-6-8->
//                -2-4-|
const stream = takeWhile(even, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { takeWhile } from '@most/core'

```

</details>

<hr />


#### tap\<A\>(f: (value: A) =\> any, stream: Stream\<A\>): Stream\<A\>

<p>

Creates a new stream that upon each event performs a side-effect.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { tap, drain } from '@motorcycle/stream'

const logStream = tap(console.log, stream)

drain(logStream)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { tap } from '@most/core'

```

</details>

<hr />


#### throttle\<A\>(ms: number, stream: Stream\<A\>): Stream\<A\>

<p>

Limit the rate of events to at most one per a number of milliseconds.

In contrast to debounce, throttle simply drops events that occur "too often", 
whereas debounce waits for a "quiet period".

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { throttle } from '@motorcycle/stream'

const source = // -abcd---abcd--->
//                -a-c----a-c---->
const stream = throttle(2, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { throttle } from '@most/core'

```

</details>

<hr />


#### throwError(err: Error): Stream\<never\>

<p>

Create a stream in the error state. 
This can be useful for functions that need to return a stream, but need to 
signal an error.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { throwError, chain, now } from '@motorcycle/stream'

const f = (x: Maybe<number>): Stream<number> => isNothing(x)
 ? throwError(new Error('cannot be given Nothing'))
 : now(fromJust(x)) 

const stream = chain(f, maybe$)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { throwError } from '@most/core'

```

</details>

<hr />


#### until\<A\>(endSignal: Stream\<any\>, stream: Stream\<A\>): Stream\<A\>

<p>

Keep all events in one stream until the first event occurs in another.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { until } from '@motorcycle/stream'

const source =     // --1-2-3-4-5-6-7-8->
const endSignal =  // ---------z-------->
//                    --1-2-3-4|
const stream = until(endSingal, source)
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { until } from '@most/core'

```

</details>

<hr />


#### withArrayValues\<A\>(array: Array\<A\>, stream: Stream\<any\>): Stream\<A\>

<p>

Creates a new stream by associating event times with 
values from an array. The resulting stream will end when all array values 
have been used or when the underlying stream ends.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { withArrayValues, periodic, observe } from '@motorcycle/stream'

const stream = withArrayValues([ 1, 2, 3 ], periodic(100))

observe(console.log, stream)
// 1 -- time 0
// 2 -- time 100
// 3 -- time 200
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { withArrayValues } from '@most/core'

```

</details>

<hr />


#### zip\<A, B, C\>(f: (a: A, b: B) =\> C, a$: Stream\<A\>, b$: Stream\<B\>): Stream\<C\>

<p>

Applies a function to corresponding pairs of events from the input streams.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { zip, observe } from '@motorcycle/stream'

const tuple = (x, y) => [x, y]

const a$ = // --1----3-------5------6----|
const b$ = // --------2--3--------4------|
//         // --------[3,2]--[5,3]--[6,4]|
const stream = zip(tuple, a$, b$)

observe(console.log, stream)
// [3, 2]
// [5, 3]
// [6, 4]
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { zip } from '@most/core'

```

</details>

<hr />


#### zipArray\<A, B, C\>(f: (a: A, b: B) =\> C, streams: [Stream\<A\>, Stream\<B\>]): Stream\<C\>

<p>

Applies a function to corresponding pairs of events from the input streams.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { zipArray, observe } from '@motorcycle/stream'

const tuple = (x, y) => [x, y]

const a$ = // --1----3-------5------6----|
const b$ = // --------2--3--------4------|
//         // --------[3,2]--[5,3]--[6,4]|
const stream = zipArray(tuple [a$, b$])

observe(console.log, stream)
// [3, 2]
// [5, 3]
// [6, 4]
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { zipArray } from '@most/core'

```

</details>

<hr />


#### zipArrayValues\<A, B, C\>(f: (arrayValue: A, streamValue: Stream\<B\>) =\> C, array: Array\<A\>, stream: Stream\<B\>): Stream\<C\>

<p>

Creates a new stream by applying a function with a value at increasing 
index of an array and the latest event value from a stream. The resulting 
stream will end when all array values have been used or as soon as the 
underlying stream ends.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { zipArrayValues, now, concat, observe } from '@motorcycle/stream'

const f = (x, y) => x + y

const array = [ 100, 200 ]
const stream = concat(now(1), now(2))

observe(console.log, zipArrayValues(f, array, stream))
// 101
// 202
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export { zipArrayValues } from '@most/core'

```

</details>

<hr />
