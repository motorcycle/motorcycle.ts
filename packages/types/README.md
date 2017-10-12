# @motorcycle/types -- 3.0.0

A shared-kernel of types for Motorcycle

## Get it
```sh
yarn add @motorcycle/types
# or
npm install --save @motorcycle/types
```

## API Documentation

All functions are curried!

#### Component

<p>

Component function type signature

</p>


```typescript

export type Component<
  Sources extends { readonly [key: string]: any },
  Sinks extends { readonly [key: string]: Stream<any> }
> = (sources: Sources) => Sinks

```


#### Delay

<p>

Delay time offset

</p>


```typescript

export type Delay = number

```


#### Disposable

<p>

Interface of a resource that can be disposed

</p>


```typescript

export interface Disposable {
  dispose(): void;
}

```


#### Handle

<p>

Opaque handle type produced by functions like setTimeout

</p>


```typescript

export type Handle = any

```


#### IOComponent

<p>

An IO Component function signature.

</p>


```typescript

export type IOComponent<
  Sinks extends { readonly [key: string]: Stream<any> },
  Sources extends { readonly [key: string]: any }
> = (sinks: Sinks) => Sources

```


#### Offset

<p>

Relative offset between to Clocks / schedulers

</p>


```typescript

export type Offset = number

```


#### Period

<p>

Span of time between time instants

</p>


```typescript

export type Period = number

```


#### ScheduledTask

<p>

A Task scheduled for a particular time

</p>


```typescript

export interface ScheduledTask {
  task: Task;
  run(): void;
  error(err: Error): void;
  dispose(): void;
}

```


#### Scheduler

<p>

A Scheduler 

</p>


```typescript

export interface Scheduler {
  now(): Time;
  asap (task: Task): ScheduledTask;
  delay (delay: Delay, task: Task): ScheduledTask;
  periodic (period: Period, task: Task): ScheduledTask;
  schedule (delay: Delay, period: Period, task: Task): ScheduledTask;
  scheduleTask (offset: Offset, delay: Delay, period: Period, task: Task): ScheduledTask;
  relative(offset: Offset): Scheduler;
  cancel(task: ScheduledTask): void;
  cancelAll(predicate: (task: ScheduledTask) => boolean): void;
}

```


#### Sink\<A\>

<p>

Motorcycle Sink type. Used to propagate events.

</p>


```typescript

export interface Sink<A> {
  event(time: Time, value: A): void;
  end(time: Time): void;
  error(time: Time, err: Error): void;
}

```


#### Stream\<A\>

<p>

Motorcycle Stream type

</p>


```typescript

export interface Stream<A> {
  run(sink: Sink<A>, scheduler: Scheduler): Disposable
}

```


#### Task

<p>

A generic Task type

</p>


```typescript

export interface Task {
  run(time: Time): void;
  error(time: Time, e: Error): void;
  dispose(): void;
}

```


#### TaskRunner

<p>

Runs a ScheduledTask

</p>


```typescript

export type TaskRunner = (st: ScheduledTask) => any;

```


#### Time

<p>

An instant in time.

</p>


```typescript

export type Time = number

```


#### Timeline

<p>

Keeps track of time

</p>


```typescript

export interface Timeline {
  add(scheduledTask: ScheduledTask): void;
  remove(scheduledTask: ScheduledTask): boolean;
  removeAll(f: (scheduledTask: ScheduledTask) => boolean): void;
  isEmpty(): boolean;
  nextArrival(): Time;
  runTasks(time: Time, runTask: TaskRunner): void;
}

```


#### Timer

<p>

A Timer interface 

</p>


```typescript

export interface Timer {
  now(): Time;
  setTimer(f: () => any, delayTime: Delay): Handle;
 clearTimer(timerHandle: Handle): void;
}

```
