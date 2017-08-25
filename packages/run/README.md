# @motorcycle/run -- 3.5.0

A statically-typed, functional and reactive framework for modern browsers

## Get it
```sh
yarn add @motorcycle/run
# or
npm install --save @motorcycle/run
```

## API Documentation

All functions are curried!

#### run\<Sources, Sinks\>(UI: Component\<Sources, Sinks\>, Application: EffectfulComponent\<Sinks, Sources\>)

<p>

Gets the Motorcycle engine roaring! This is the core of Motorcycle.ts. It 
creates an application loop between your purely-functional `UI` function, and your
side-effectful `Application` function using [`@most/core`](https://github.com/mostjs/core).

This is made possible by the use of the ES2015 Proxy. This means Motorcycle.ts
will only support modern browser with this feature. All major browsers, still 
supported by their vendors(Google, Microsoft, Apple), support this feature.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { run } from '@motorcycle/run'
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

run(UI, makeDomComponent(document.querySelector('#app')))
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

  const disposable = replicateSinks(sinks, sinkProxies)

  function dispose() {
    endSignal.event(scheduler.now(), void 0)
    disposable.dispose()
    disposeSources(sources)
  }

  return { sinks, sources, dispose }
}

```

</details>

<hr />
